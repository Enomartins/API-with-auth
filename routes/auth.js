const router = require('express').Router()
const User = require('../models/User')
const Joi = require('joi');
const bcrypt = require('bcrypt')


router.post('/register', async(req, res) => {

    const schema = Joi.object({
        name: Joi.string()
            .min(6)
            .max(30)
            .required(),
    
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .min(6)
            .max(30)
            .required(),
    
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{5,300}$')),
    
        //repeat_password: Joi.ref('password')
    
    })
    
   
    try {
        const value = await schema.validateAsync(req.body);
    }
    catch ({details}) {
        return res.status(400).send(details[0].message)
    }

    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send('The email already exists')


    
    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            if (err) return res.send('hashing failed')
            console.log(hash)
            hashedPassword = hash

            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash
            })
            
            
            user.save().then(savedUser =>{
                return res.send(savedUser)
            }).catch(err =>{
                return res.status(400).send(error)
            })

        });
    });


})


router.post('/login', async (req, res) =>{
    const schema = Joi.object({
    
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .min(6)
            .max(30)
            .required(),
    
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{5,300}$')),
    
        //repeat_password: Joi.ref('password')
    
    })
    
   
    try {
        const value = await schema.validateAsync(req.body);
    }
    catch ({details}) {
        return res.status(400).send(details[0].message)
    }

    const userExist = await User.findOne({email: req.body.email})
    
    if(!userExist) return res.status(400).send('The email does not exists')
    
    bcrypt.compare(req.body.password, userExist.password).then(function(result) {
        if(result) res.status(200).send("User Successfuly LoggedIn")
        else res.status(400).send("The password is wrong")
    });
    


})


module.exports = router