const userModel = require('../models/users')
const {setUser} = require('../services/auth')

function handleShowLoginPage(req, res){
    return res.status(200).render('login')
}

function handleShowSignupPage(req, res){
    return res.status(200).render('signup')
}

async function handleCreateUser(req, res){
    const body = req.body
    
    const createdUser = await userModel.create({
        name : body.name,
        email : body.email,
        password : body.password,
        role : body.role,
    })

    // send the token to the client
    const token = setUser(createdUser)
    res.cookie('uid', token)

    return res.status(200).render('homepage', {
        name : createdUser.name
    })
}

async function handleValidateLogin(req, res){
    const body = req.body

    const reqUser = await userModel.findOne({email : body.email, password : body.password})

    // case if user not found redirect to login again
    if(!reqUser){
        return res.status(404).render('login', {
            msg : 'no user found with these credentials!'
        })
    }

    // if user found the send the token to client
    const token = setUser(reqUser)
    res.cookie('uid', token)

    // case if user found
    return res.status(200).render('homepage', {
        name : reqUser.name
    })
}

module.exports = {
    handleShowLoginPage,
    handleShowSignupPage,
    handleCreateUser,
    handleValidateLogin
}