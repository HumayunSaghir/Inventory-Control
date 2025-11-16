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

function checkAuthorization(roles = []){
    return (req, res, next) => {
        // when not authenticated.
        if(!req.user){
            return res.render('login', {
                msg : 'please login first!',
            })
        }

        // when authenticated
        const permission = roles.includes(req.user.role)

        if(permission === false){
            return res.status(403).json({status : 'access denied for this resource!'})
        }

        // else call next
        next()
    }
}

module.exports = {
    restrictLoginUser,
    checkAuthorization,
}