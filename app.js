const express = require("express")
const bodyParser = require("body-parser")
// const moment = require("moment")
// 链接数据库
// const mysql = require("mysql")
// const conn = mysql.createConnection({
//     host: '127.0.0.1',
//     database: "hi",
//     user: 'root',
//     password: "root"
// })
const app = express()
// 默认模板引擎
app.set("view engine", "ejs")
app.set("views", "./views")
app.use("/node_modules", express.static("./node_modules"))

app.use(bodyParser.urlencoded({ extended: false }))
const router = require('./router/user.js')
app.use(router)
const router1 = require('./router/idnex.js')
app.use(router1)
app.listen(80, () => {
    console.log("http://127.0.0.1")
})
