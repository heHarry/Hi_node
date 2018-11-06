// 初始化
const initialize = (req, res) => {
    if(!req.session.islogin) return res.redirect("/login")
    res.render("index.ejs", { 
        user:req.session.user,
        islogin:req.session.islogin
     })
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
