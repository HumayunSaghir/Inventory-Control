const {getUser} = require('../services/auth')

function restrictLoginUser(req, res, next){
    // get the token value
    const tokenValue = req.cookies.uid
    // redirect to login if token not present
    if(!tokenValue){
        return res.render('login', {
            msg : 'please login first!'
        })
    }

    // if token is there validate it
    const user = getUser(tokenValue)

    req.user = user
    next()
}

module.exports = restrictLoginUser