const express = require("express")
const bodyParser = require("body-parser")
const fs = require("fs")
const path = require("path")
const app = express()
const session = require("express-session")
app.use(session({
    secret: 'Hi',
    resave: false,
    saveUninitialized: false,
    // cookie: { secure: true }
  }))

// 默认模板引擎
app.set("view engine", "ejs")
app.set("views", "./views")
app.use("/node_modules", express.static("./node_modules"))

app.use(bodyParser.urlencoded({ extended: false }))
fs.readdir(path.join(__dirname,"./router"),(err,result)=>{
    // 判断文件读取是否成功
    if(err) return console.log("读取router文件失败")
    // 遍历读取router文件夹里面文件
    result.forEach(item=>{
        // console.log(item)
    const router = require(path.join(__dirname,"./router",item))
    app.use(router)
    })
})
app.listen(80, () => {
    console.log("http://127.0.0.1")
})
