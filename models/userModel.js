const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Joi = require('@hapi/joi')

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
        unique: false,
        trim: true,
        minlength: 3,
        maxlength: 50
    }

},{collection:'users', timestamps:true})


userSchema.methods.joiValidation = function (userObject){

    const schema =  Joi.object({
        name: Joi.string().min(3).max(50).trim().required(),
        userName: Joi.string().min(3).max(50).trim().required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().required()
    })

    return schema.validate(userObject)

}



const User = mongoose.model('User', userSchema)

module.exports = User