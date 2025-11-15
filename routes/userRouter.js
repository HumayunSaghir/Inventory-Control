const express = require('express')
const {handleShowLoginPage, handleShowSignupPage, handleCreateUser, handleValidateLogin} = require('../controllers/users')

const router = express.Router()

router.get('/login', handleShowLoginPage)
router.get('/signup', handleShowSignupPage)
router.post('/validateSignup', handleCreateUser)
router.post('/validateLogin', handleValidateLogin)

module.exports = router