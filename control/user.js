const moment = require("moment")
const conn = require("../db/index.js")
const register = (req, res) => {
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
}
const login = (req, res) => {
    const body = req.body
    const sql = "select * from users where  username = ? and password = ?  "
    conn.query(sql, [body.username, body.password], (err, result) => {
        if (err) return res.status(501).send({ msg: "请重新输入" })
        if (result.length !== 1) return res.status(505).send({ msg: "请更换其他用户名重新注册", status: 505 })
        req.session.islogin = true
        req.session.user = result[0]
        let hour = 1000 * 60*60*24*30
        req.session.cookie.expires = new Date(Date.now() + hour)
        res.send({ status: 200, msg: "登录成功" })
    })

}
const logout = (req, res) => {
    req.session.destroy(err => {
        // cannot access session here
        res.redirect("/")
    })
}

module.exports = {
    register,
    login,
    logout
}