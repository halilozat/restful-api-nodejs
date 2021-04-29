const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({

    name: {
        type: String,
        req: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    userName: {
        type: String,
        req: true,
        unique: true, //unique username
        trim: true, //clear left and right space
        lowercase: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        req: true,
        unique: true, 
        trim: true, 
        lowercase: true,
        minlength: 3,
        maxlength: 50
    },
    password: {
        type: String,
        req: true,
        unique: true, 
        trim: true
    }

},{collection:'users', timestamps:true})

const User = mongoose.model('User', userSchema)

module.exports = User