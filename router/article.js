const express = require("express")
const router = express.Router()
const str = require("../control/article.js")
router.get('/add/article',str.handleArticleGet)
router.post('/add/article',str.handleArticlePost)
router.get('/info/article/:id',str.handleArticleInfoGet)
// 编辑页面
router.get('/info/eduit/:id',str.handleArticleInfoGetShow)
router.post('/info/eduit',str.handleArticleInfoPost)
module.exports = router