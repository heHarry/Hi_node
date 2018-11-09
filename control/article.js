const express = require("express")
const moment = require("moment")
const marked = require("marked")
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
// 插入数据
const handleArticlePost = (req,res)=>{
    if(!req.session.islogin) return res.status(400).send({status:400,msg:"您登录信息失效"})
    const body = req.body
    if(!body.title) { return res.send({status:404,msg:"请输入文章标题"})}
    if(!body.content)  {return res.send({status:404,msg:"请输入文章内容"})}
     body.ctime = moment().format("YYYY-MM-DD HH:mm:ss")
     console.log(body.ctime)
     const sql = "insert into article set ? "
     conn.query(sql,body,(err,result)=>{
         if(err) {return res.status(404).send({status:404,msg:"请重新输入内容 查询失败"})}
        //  console.log(result)
         res.status(200).send({status:200,msg:"成功",articleId:result.insertId})
     })
    // console.log(body)
}
const handleArticleInfoGet=(req,res)=>{
    if(!req.session.islogin) return res.redirect('/')
    const id = req.params.id
    // console.log(req.params.id)
    
    const sql = "select *from article where id = ?"
    conn.query(sql,id,(err,result)=>{
        // console.log(result)
        if(err) return res.status(400).send({msg:'获取文章失败'})
        result[0].content = marked(result[0].content)
        // console.log(result[0].content)
        res.render("./article/info.ejs", { 
            user:req.session.user,
            islogin:req.session.islogin,
            data:result[0]  
        })
    })
}
// 显示编辑页面
const handleArticleInfoGetShow=(req,res)=>{
    if(!req.session.islogin) return res.redirect('/')
    const id = req.params.id
    // console.log(req.params.id)
    
    const sql = "select * from article where id = ?"
    conn.query(sql,id,(err,result)=>{
        // console.log(result)
        if(err) return res.status(400).send({msg:'获取文章失败'})
        // result[0].content = marked(result[0].content)
        console.log(result[0])
        res.render("./article/eduit.ejs", { 
            user:req.session.user,
            islogin:req.session.islogin,
            data:result[0]  
        })
    })
}
// 修改编辑页面
const handleArticleInfoPost =(req,res)=>{
    const sql = "update article set ? where id = ?"
    // console.log(req.body)
   const body = req.body
    body.ctime = moment().format("YYYY-MM-DD HH:mm:ss")
    console.log(body.ctime)
    conn.query(sql,[req.body,req.body.id],(err,result)=>{
        // console.log(result)
        if(err||result.affectedRows!==1) return res.send({status:400,msg:"更新失败"})
        res.send({msg:"ok",status:200})
    })
}
module.exports={
    handleArticleGet,
    handleArticlePost,
    handleArticleInfoGet,
    handleArticleInfoGetShow,
    handleArticleInfoPost
}

