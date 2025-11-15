const jwt = require('jsonwebtoken')
const secretKey = '81103296'

// this function will return you a token after signing the paylaod
function setUser(user){
    return jwt.sign({
        _id : user._id,
        email : user.email
    }, secretKey)
}

// this function will give you the user after verifying the token
function getUser(token){
    try{
        return jwt.verify(token, secretKey)
    }
    catch(err){
        return null 
    }
}

module.exports = {
    setUser,
    getUser,
}