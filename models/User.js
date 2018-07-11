const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const User = new Schema({
        firstName:String,
        lastName:String,
        email:String,
        phoneNumber:String,
        Password:String,
        Role:String,
        profileImg:String
    })

User.plugin(passportLocalMongoose, { usernameField: 'email' })

module.exports = mongoose.model('User', User)
