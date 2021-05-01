const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Joi = require('@hapi/joi')
const createError = require('http-errors');

const userSchema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength:50
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
        required: true,
        minlength:6,
        trim:true
    }

},{collection:'users', timestamps:true})


//My schema
const schema =  Joi.object({
    name: Joi.string().min(3).max(50).trim(),
    userName: Joi.string().min(3).max(50).trim(),
    email: Joi.string().trim().email(),
    password: Joi.string().trim()
})

//New user for validation
userSchema.methods.joiValidation = function (userObject){
    schema.required()
    return schema.validate(userObject)
}

//Update user for validation
userSchema.statics.joiValidationForUpdate = function (userObject){
    return schema.validate(userObject)
}


userSchema.methods.toJSON = function () {
    const user = this.toObject()

    delete user._id,
    delete user.createdAt,
    delete user.updatedAt,
    delete user.__v
    delete user.password
    return user
}



const User = mongoose.model('User', userSchema)

module.exports = User