//var fullName = "lê bá sơn lâm";
//console.log(fullName.charAt(0).toLocaleUpperCase() + fullName.slice(1));
var fullName = "lê bá sơn lâm";
var result = fullName
  .split(" ") // Tách chuỗi thành mảng: ["lê", "bá", "sơn", "lâm"]
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Viết hoa chữ đầu mỗi từ
  .join(" "); // Ghép lại thành chuỗi: "Lê Bá Sơn Lâm"
console.log(result);
