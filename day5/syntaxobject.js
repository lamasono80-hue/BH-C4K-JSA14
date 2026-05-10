let person = {
  fullName: "lam",
  age: 2010,
  gender: "male",
};
// ==========================================================
// truy vấn dữ liệu
//  consele.log("cách 1:", person.fullName)
//  consele.log("cách 2: " , person["fullName"])

// ===========================================================
//  thêm key và value vô object
// cách 1
// person["hair"] = "black hair";
// console.log("cách 1: ", person);
// cách 2:
// person.eyeColer = "black eye";
// console.log("cách 2 : ", person);

// ============================================
// lặp qua từng key trong object
for (let item in person) {
  console.log(person[item]);
}
