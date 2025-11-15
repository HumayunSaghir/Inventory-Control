const userModel = require('../models/users')

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
    })

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