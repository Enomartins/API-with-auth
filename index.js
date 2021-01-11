const express = require('express')
const app =  express()

const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoutes = require('./routes/auth')

dotenv.config()

//Middlewares
app.use(express.json())

//connect to DB
mongoose.connect(process.env.DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true }, ()=> console.log('connected to DB!!!'))


 
//Route Middlewares
app.use('/api/auth', authRoutes)


app.listen(3000, () =>
    console.log('Server Up and running on Port 3000')
)