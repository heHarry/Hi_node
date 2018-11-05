const mysql = require("mysql")
const conn = mysql.createConnection({
    host: '127.0.0.1',
    database: "hi",
    user: 'root',
    password: "root"
})
// 创建数据库对象模块暴露出去
module.exports=conn


