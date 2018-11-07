const express = require("express")
const moment = require("moment")
const conn =  require("../db/index.js")
// 监听客户端请求
const handleArticleGet = (req, res) => {
    if(!req.session.islogin) return res.redirect("/")
    res.render("./article/article.ejs", { 
        user:req.session.user,
        islogin:req.session.islogin
     })
}
// 监听服务端请求数据
const handleArticlePost = (req,res)=>{
    if(!req.session.islogin) return res.status(400).send({status:400,msg:"您登录信息失效"})
    const body = req.body
    if(!body.title) { return res.send({status:404,msg:"请输入文章标题"})}
    if(!body.content)  {return res.send({status:404,msg:"请输入文章内容"})}
     body.ctime = moment().format("YYYY-MM-DD HH:mm:ss")
     const sql = "insert into article set ? "
     conn.query(sql,body,(err,result)=>{
         if(err) {return res.status(404).send({status:404,msg:"请重新输入内容 查询失败"})}
        //  console.log(result)
         res.status(200).send({status:200,msg:"成功",articleId:result.insertId})
     })
    // console.log(body)
}
const handleArticleInfoGet=(req,res)=>{
    const body = req.body
    if(!req.session.islogin) return res.redirect("/")
    res.render("./article/info.ejs", { 
        user:req.session.user,
        islogin:req.session.islogin
     })
     
     console.log(req.id)
     const sql = "select *from article where id = ?"
    //  conn.query(sql,body.user)
}
module.exports={
    handleArticleGet,
    handleArticlePost,
    handleArticleInfoGet
}

