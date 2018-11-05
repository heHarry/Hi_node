// 初始化
const initialize = (req, res) => {
    res.render("index.ejs", { name: "哈哈", age: 12 })
}
const showLogin = (req, res) => {
    res.render("./user/login.ejs", {})
}
const showRegister = (req, res) => {
    res.render("./user/register.ejs", {})
}
module.exports = {
    showLogin,
    showRegister,
    initialize
}
