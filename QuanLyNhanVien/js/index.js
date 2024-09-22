let arrNhanVien = [];

// hàm lưu dữ liệu vào local
function setLocalstorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStrorage(key) {
  let dataLocal = localStorage.getItem(key);
  return dataLocal ? JSON.parse(dataLocal) : null;
}

// hàm handle thêm nhân viên
document.getElementById("btnThemNV").onclick = function () {
  let nhanVien = handleGetDataForm();
  if (nhanVien) {
    arrNhanVien.push(nhanVien);
    renderDataNhanVien();
    setLocalstorage("arrNhanVien", arrNhanVien);
    document.getElementById("formNhanVien").reset();
  }
};

window.onload = function () {
  let dataLocal = getLocalStrorage("arrNhanVien");
  if (dataLocal) {
    arrNhanVien = dataLocal;
    renderDataNhanVien();
  }
};

// Hàm định dạng tiền tệ
function formatCurrency(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

// hàm hiển thị thông tin lên table
function renderDataNhanVien(arr = arrNhanVien) {
  let content = "";

  for (let nhanVien of arr) {
    let newNhanVien = new NhanVien();
    Object.assign(newNhanVien, nhanVien);

    let { tknv, name, email, datepicker, chucvu } = newNhanVien;

    content += `
       <tr>
                  <td>${tknv}</td>
                  <td>${name}</td>
                  <td>${email}</td>
                  <td>${datepicker}</td>
                  <td>${chucvu}</td>
                 <td>${formatCurrency(newNhanVien.tinhTongLuong())}</td>
                  <td>${newNhanVien.xepLoai()}</td>
                  <td>
                      <button onclick="deleteNhanVien('${name}')" class="btn btn-danger">Xóa</button>
                      <button onclick="getInfoNhanVien('${name}')" class="btn btn-warning">Sửa</button>
                  </td>
              </tr>
    `;
  }

  document.getElementById("tableDanhSach").innerHTML = content;
}

// hàm lấy dữ liệu từ form
function handleGetDataForm() {
  let formFields = document.querySelectorAll("#formNhanVien input, select");
  let nhanVien = new NhanVien();

  let flag = true;

  for (let field of formFields) {
    let { id, value } = field;
    nhanVien[id] = value;
    // tìm đến thẻ form-group
    let formGroup = field.closest(".form-group");

    // tìm thẻ span trong form-group
    let theThongBao = formGroup.querySelector(".sp-thongbao");
    if (!checkEmptyValue(theThongBao, value)) {
      flag = false;
    } else {
      // trường hợp dữ liệu không bị trống
      // truy xuất tới các thuộc tính data-validation
      let dataValue = field.getAttribute("data-validation");

      let dataMin = field.getAttribute("data-min");
      let dataMax = field.getAttribute("data-max");
      if (dataValue === "taiKhoan") {
        if (!checkMinMaxValue(theThongBao, value, dataMin, dataMax)) {
          flag = false;
        }
      } else if (dataValue === "hoTen") {
        if (!checkHoTenValue(theThongBao, value)) {
          flag = false;
        }
      } else if (dataValue === "Email") {
        if (!checkEmailValue(theThongBao, value)) {
          flag = false;
        }
      } else if (dataValue === "matKhau") {
        if (
          !checkPassWordValue(theThongBao, value) ||
          !checkMinMaxValue(theThongBao, value, dataMin, dataMax)
        ) {
          flag = false;
        }
      } else if (dataValue === "luongCoBan") {
        if (!checkLuongValue(theThongBao, value)) {
          flag = false;
        }
      } else if (dataValue === "gioLam") {
        if (!checkSoGioValue(theThongBao, value)) {
          flag = false;
        }
      }
    }
  }
  return flag ? nhanVien : null;
}

// hàm xử lý xóa nhân viên
function deleteNhanVien(hoTen) {
  // Tìm vị trí sinh viên trong mảng dựa trên mã sinh viên (maSV)
  let index = arrNhanVien.findIndex((item, i) => item.name === hoTen);

  // xử lý xóa sinh viên và cập nhật lại dữ liệu
  if (index != -1) {
    arrNhanVien.splice(index, 1);
    renderDataNhanVien();
    setLocalstorage("arrNhanVien", arrNhanVien);
  }
}

// hàm xử lý lấy dữ liệu nhân viên hiển thị lại trên form
function getInfoNhanVien(hoTen) {
  let sinhVien = arrNhanVien.find((item) => item.name === hoTen);
  if (sinhVien) {
    // hàm để hiển thị modal.
    $("#myModal").modal("show");
    // shown.bs.modal để đảm bảo rằng modal đã được hiển thị hoàn toàn trước khi thực hiện các thao tác tiếp theo.
    $("#myModal").on("shown.bs.modal", function () {
      let formFields = document.querySelectorAll("#formNhanVien input, select");
      for (let field of formFields) {
        field.value = sinhVien[field.id];
      }
    });
  }
}

// hàm xử lý cập nhập nhân viên
document.getElementById("btnCapNhat").onclick = function () {
  let sinhVien = handleGetDataForm();
  if (sinhVien) {
    let index = arrNhanVien.findIndex((item, i) => item.name == sinhVien.name);
    if (index != -1) {
      arrNhanVien[index] = sinhVien;
      renderDataNhanVien();
      setLocalstorage("arrNhanVien", arrNhanVien);
      document.getElementById("formNhanVien").reset();
      $("#myModal").modal("hide");
    }
  }
};

document.getElementById("searchName").oninput = function (e) {
  let keyWord = e.target.value.trim().toLowerCase();
  let newKeyWord = removeVietnameseTones(keyWord);
  let arrSearch = arrNhanVien.filter((item, index) => {
    let newTenSV = removeVietnameseTones(item.name.trim().toLowerCase());
    return newTenSV.includes(newKeyWord);
  });
  renderDataNhanVien(arrSearch);
};
