const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Joi = require('@hapi/joi')
const createError = require('http-errors');
const bcrypto = require('bcrypt')

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
    password: Joi.string().min(6).trim()
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


userSchema.statics.login = async (email, password) => {
    
    const{error,value} = schema.validate({email,password})
    if (error) {
        throw createError(400,error)
    }
    
    const user = await User.findOne({email})

    if(!user){
        throw createError(400,"email/password is wrong")
    }

    const passwordControl = await bcrypto.compare(password,user.password)

    if(!passwordControl) {
        throw createError(400,"email/password is wrong")
    }

    return user
}



const User = mongoose.model('User', userSchema)

module.exports = User