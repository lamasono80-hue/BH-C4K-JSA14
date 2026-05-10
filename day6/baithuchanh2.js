const form = document.getElementById("myForm");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Ngăn submit mặc định

  // Reset tất cả lỗi trước
  resetErrors();

  let isValid = true;

  // 1. Họ và tên
  const fullname = document.getElementById("fullname").value.trim();
  if (fullname === "") {
    showError("fullnameError", "Họ và tên không được để trống");
    isValid = false;
  } else if (fullname.length < 3) {
    showError("fullnameError", "Họ tên phải có ít nhất 3 ký tự");
    isValid = false;
  }

  // 2. Email
  const email = document.getElementById("email").value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    showError("emailError", "Email không được để trống");
    isValid = false;
  } else if (!emailRegex.test(email)) {
    showError("emailError", "Email không hợp lệ");
    isValid = false;
  }

  // 3. Số điện thoại
  const phone = document.getElementById("phone").value.trim();
  if (phone !== "") {
    const phoneRegex = /^(0|\+84)[3|5|7|8|9]\d{8}$/;
    if (!phoneRegex.test(phone)) {
      showError("phoneError", "Số điện thoại không hợp lệ (VD: 0912345678)");
      isValid = false;
    }
  }

  // 4. Giới tính
  const gender = document.getElementById("gender").value;
  if (gender === "") {
    showError("genderError", "Vui lòng chọn giới tính");
    isValid = false;
  }

  // 5. Ngày sinh (tùy chọn - kiểm tra tuổi)
  const birthday = document.getElementById("birthday").value;
  if (birthday) {
    const age = calculateAge(birthday);
    if (age < 16) {
      showError("birthdayError", "Bạn phải đủ 16 tuổi trở lên");
      isValid = false;
    }
  }

  if (isValid) {
    alert("✅ Form hợp lệ thành công!\nĐang gửi dữ liệu...");
    // form.submit();   // Uncomment nếu muốn submit thật
  }
});

// Hàm hiển thị lỗi
function showError(errorId, message) {
  const errorElement = document.getElementById(errorId);
  errorElement.textContent = message;
  errorElement.style.display = "block";

  // Highlight input
  const inputId = errorId.replace("Error", "");
  const input = document.getElementById(inputId);
  if (input) input.classList.add("invalid");
}

// Reset tất cả lỗi
function resetErrors() {
  document.querySelectorAll(".error").forEach((el) => {
    el.style.display = "none";
  });
  document.querySelectorAll("input, select").forEach((el) => {
    el.classList.remove("invalid");
  });
}

// Tính tuổi
function calculateAge(birthday) {
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}
