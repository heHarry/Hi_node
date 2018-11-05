const express = require("express")
const bodyParser = require("body-parser")
const moment = require("moment")
// 链接数据库
const mysql = require("mysql")
const conn = mysql.createConnection({
    host: '127.0.0.1',
    database: "hi",
    user: 'root',
    password: "root"
})
const app = express()
// 默认模板引擎
app.set("view engine", "ejs")
app.set("views", "./views")
app.use("/node_modules", express.static("./node_modules"))

app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.)
app.get("/", (req, res) => {
    res.render("index.ejs", { name: "哈哈", age: 12 })
})
// 展示登录注册页面
app.get("/login", (req, res) => {
    res.render("./user/login.ejs", {})
})
app.get("/register", (req, res) => {
    res.render("./user/register.ejs", {})
})
// 注册
app.post("/register", (req, res) => {
    const body = req.body

    // 判断数据是否输入
    console.log(body)
    if (body.username.trim().length <= 0 || body.password.trim().length <= 0 || body.nickname.trim().length <= 0) {
        return res.status(501).send({ status: 501, msg: "重新输入信息" })
    }
    // 判断信息是否重复
    const sql = "select count(*) as c from users where username = ?"
    conn.query(sql, body.username, (err, result) => {
        if (err) { return res.send({ msg: "请重新输入" }) }
        if (result[0].c != 0) return res.status(505).send({ msg: "请更换其他用户名重新注册", status: 505 })
        body.ctime = moment().format("YYYY-MM-DD HH:mm:ss")
        const inSql = "insert into users set ?"
        conn.query(inSql, body, (err, result) => {
            if (err) return res.status(504).send({ msg: "注册失败", status: 504 })
            if (result.affectedRows !== 1) return res.status(505).send({ msg: "注册失败", status: 505 })
            res.send({ status: 200, msg: "ok" })
        })
    })
})
// 登录页面
app.post("/login", (req, res) => {
    const body = req.body
    const sql = "select * from users where  username = ? and password = ?  "
    conn.query(sql,[body.username,body.password],(err,result)=>{
        if (err) return res.status(501).send({ msg: "请重新输入" }) 
        if (result.length !== 1) return res.status(505).send({ msg: "请更换其他用户名重新注册", status: 505 })
        res.send({ status: 200, msg: "ok" })
    })
   
})
app.listen(80, () => {
    console.log("http://127.0.0.1")
})
