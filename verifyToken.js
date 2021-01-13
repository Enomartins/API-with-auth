const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    const token = req.header('auth-token')

    if(!token) res.status(401).send("User does not have access") 

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified
        next()
    } catch (error) {
        res.status(401).send("Invalid Token")
    }
}