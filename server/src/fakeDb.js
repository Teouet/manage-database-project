const fs = require("fs");
const path = require("path");
let firstNameArr = ["mai", "tran", "thai", "nguyen", "chung", "cao", "la", "trinh"]
let lastNameArr = ["thanh", "hieu", "cong", "thach", "tai", "nien", "thang", "thao", "long"]
let arrResult = [];
for (let i = 1; i < 900; i++) {
    let date = new Date(+(new Date()) - Math.floor(Math.random() * 31622400000)).getTime()
    let randomFirstName = Math.floor(Math.random() * firstNameArr.length);
    let firstName = firstNameArr[randomFirstName]
    let randomLastName = Math.floor(Math.random() * lastNameArr.length);
    let lastName = lastNameArr[randomLastName]
    let randomUserName = firstName + lastName + i
    let user = {
        firstName: firstName,
        lastName: lastName,
        username: randomUserName,
        password: "test123456",
        date: date
    }
    arrResult.push(user);
}
fs.writeFileSync(path.join(process.cwd(), "user.txt"), JSON.stringify(arrResult))
console.log(arrResult)