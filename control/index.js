// 初始化
const initialize = (req, res) => {
    // if(!req.session.islogin) return res.redirect("/login")
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

// 主页面
const conn = require("../db/index.js")
const showIndexPage = (req, res) => {
    // 每页显示3条数据
    const pagesize = 3
    const nowpage = Number(req.query.page) || 1
    console.log(nowpage)
    const sql = `select a.id,a.title,a.ctime,a.authorId,users.nickname  from article as a
    LEFT JOIN users 
    ON a.authorId=users.id
    ORDER BY a.id desc 
    limit 0, 3 `
    conn.query(sql, (err, result) => {
        // console.log(result)
        // console.log(result[1].ctime)
      if (err) { 
        return res.render('index.ejs', {
          user: req.session.user,
          islogin: req.session.islogin,
          // 文章列表
          articles: []
        })
      }
      res.render('index.ejs', {
        user: req.session.user,
        islogin: req.session.islogin,
        data: result,
      
      })
    })
  }
module.exports = {
    showLogin,
    showRegister,
    initialize,
    showIndexPage
}
