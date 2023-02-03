const express = require('express')
const router = express.Router()

const { register, loginUser } = require('../controllers/auth')
const { requireSignIn, isAdmin } = require('../middlewares/auth')

router.post('/register', register)
router.post('/login', loginUser)
router.get('/auth-check',requireSignIn,(req,res)=>{
    res.json({ok : true})
})
router.get('/admin-check',isAdmin,(req,res)=>{
    res.json({ok : true})
})

module.exports = router
