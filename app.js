const express = require("express")
const app = express()
// 默认模板引擎
app.set("view engine","ejs")
app.set("views","./views")
app.use("/node_modules",express.static("./node_modules"))
app.get("/",(req,res)=>{
    res.render("index.ejs",{name:"哈哈",age:12})
})
app.listen(80,()=>{
    console.log("http://127.0.0.1")
})