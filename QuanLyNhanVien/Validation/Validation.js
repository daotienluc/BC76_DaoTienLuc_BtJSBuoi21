// kiểm tra dữ liệu rỗng, kiểm tra định dạng email,
// kiểm tra giới hạn ký tự, kiểm tra xem giá trị nhập vào có trong khoảng hay không,
// kiểm tra nhập vào chữ không cho phép

function checkEmptyValue(theThongBao, value) {
  if (value == "") {
    // Thông báo lỗi
    theThongBao.innerHTML = "Vui lòng không được bỏ trống";
    theThongBao.style.display = "inline-block";
    return false;
  } else {
    // Xóa thông báo khi không còn lỗi
    theThongBao.innerHTML = "";
    theThongBao.style.display = "none";
    return true;
  }
}

function checkMinMaxValue(theThongBao, value, min, max) {
  let length = value.length;
  if (length < min || length > max) {
    theThongBao.innerHTML = `Vui lòng nhập từ ${min} đến ${max}`;
    theThongBao.style.display = "inline-block";
    return false;
  } else {
    theThongBao.innerHTML = "";
    theThongBao.style.display = "none";
    return true;
  }
}

function checkLuongValue(theThongBao, value) {
  let min = 1000000;
  let max = 20000000;
  if (value < min || value > max) {
    theThongBao.innerHTML = "Lương cơ bản chỉ từ 1 000 000 - 20 000 000";
    theThongBao.style.display = "inline-block";
    return false;
  } else {
    theThongBao.innerHTML = "";
    theThongBao.style.display = "none";
    return true;
  }
}

function checkSoGioValue(theThongBao, value) {
  let min = 80;
  let max = 200;
  if (value < min || value > max) {
    theThongBao.innerHTML = "Số giờ làm trong tháng phải từ 80 - 200 giờ";
    theThongBao.style.display = "inline-block";
    return false;
  } else {
    theThongBao.innerHTML = "";
    theThongBao.style.display = "none";
    return true;
  }
}

function checkHoTenValue(theThongBao, value) {
  let regex = /^[^\d]+$/;
  let checkHoTen = regex.test(value);
  if (checkHoTen) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML =
      "Tên nhân viên không được chứa số và ký tự đặc biệt";
    theThongBao.style.display = "inline-block";
    return false;
  }
}

function checkEmailValue(theThongBao, value) {
  let regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let checkEmail = regexEmail.test(value);
  if (checkEmail) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML = "Vui lòng nhập đúng định dạng Email";
    theThongBao.style.display = "inline-block";
    return false;
  }
}

function checkPassWordValue(theThongBao, value) {
  let regexPassWord =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/;

  let checkPassWord = regexPassWord.test(value);
  if (checkPassWord) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML =
      "Vui lòng nhập mật khẩu có ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt";
    theThongBao.style.display = "inline-block";
    return false;
  }
}
