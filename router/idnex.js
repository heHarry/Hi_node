const express = require("express")
const router = express.Router()
const show = require("../control/index.js")
router.get("/",show.showIndexPage)
router.get('/login',show.showLogin)
router.get('/register',show.showRegister)
// 主页响应
// router.get('/register',show.showRegister)
module.exports = router