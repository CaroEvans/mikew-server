require('dotenv').config()
const config = require('./_config');
const mongoose = require('mongoose')
const express= require('express')

const app = express()

// middleware
const bookings = require('./routes/bookings')
const users = require('./routes/users')

// routing
app.use('bookings', bookings)
app.use('users', users)


// db connection
mongoose.connect(config.mongoURI[app.settings.env],(err)=>{
    if(err){
        console.log('Error:', err.message)
    }else{
        console.log('Connected to db')
    }
})


app.listen(process.env.PORT || 8080, ()=> console.log('listening on 8080'))

module.exports = app