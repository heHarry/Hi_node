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
     body.ctime = moment().format("YYYY-MM-DD HH:mm:ss")
     const sql = "insert into article set ? "
     conn.query(sql,body,(err,result)=>{
         if(!body.title) return res.status(400).send({status:404,msg:"请输入标题"})
         if(!body.content) return res.status(400).send({status:404,msg:"请输入内容"})
         if(err) return res.status(404).send({status:404,msg:"请重新输入内容 查询失败"})
         res.status(200).send({status:200,msg:"成功"})
     })
    console.log(body)
}
const handleArticleInfoGet=(req,res)=>{
    if(!req.session.islogin) return res.redirect("/")
    res.render("./article/info.ejs", { 
        user:req.session.user,
        islogin:req.session.islogin
     })
}
module.exports={

    handleArticleGet,
    handleArticlePost,
    handleArticleInfoGet
}

