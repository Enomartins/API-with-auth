const router = require('express').Router()

const verify = require('../verifyToken')


router.get('/', verify, (req, res) => {
    res.json({
        post:{
            title: "A private post",
            content: "Highly sensitive data that should be viewed by authorised people only"
        }
    })
})

module.exports = router