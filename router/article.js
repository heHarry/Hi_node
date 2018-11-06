const express = require("express")
const router = express.Router()
const str = require("../control/article.js")
router.get('/add/article',str.handleArticleGet)
router.post('/add/article',str.handleArticlePost)
router.get('/info/article',str.handleArticleInfoGet)
module.exports = router