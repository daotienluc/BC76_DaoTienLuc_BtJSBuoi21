class NhanVien {
  tknv = "";
  name = "";
  email = "";
  password = "";
  datepicker = "";
  luongCB = "";
  chucvu = "";
  gioLam = "";

  tinhTongLuong = function () {
    let luongCB = parseFloat(this.luongCB) || 0;
    let gioLam = parseFloat(this.gioLam) || 0;
    let chucvu = this.chucvu;

    let tongLuong;
    switch (chucvu) {
      case "Sếp":
        tongLuong = luongCB * 3;
        break;
      case "Trưởng phòng":
        tongLuong = luongCB * 2;
        break;
      case "Nhân viên":
        tongLuong = luongCB;
        break;
      default:
        tongLuong = 0;
        break;
    }

    return tongLuong * gioLam;
  };

  // Phương thức xếp loại nhân viên
  xepLoai = function () {
    let gioLam = parseFloat(this.gioLam) || 0;

    if (gioLam >= 192) {
      return "Nhân viên xuất sắc";
    } else if (gioLam >= 176) {
      return "Nhân viên giỏi";
    } else if (gioLam >= 160) {
      return "Nhân viên khá";
    } else {
      return "Nhân viên trung bình";
    }
  };
}
