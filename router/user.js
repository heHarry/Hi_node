const express = require("express")
const router = express.Router()
const str = require("../control/user.js")
router.post('/login',str.login)
router.post('/register',str.register)
module.exports = router

