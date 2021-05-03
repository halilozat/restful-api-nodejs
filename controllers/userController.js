const User = require('../models/userModel')
const createError = require('http-errors')
const bcrypto = require('bcrypt')


const loggedInUserInfo = (req,res,next) => {
    res.json(req.user)
}

const loggedInUserUpdate = async (req,res,next) => {
    delete req.body.createdAt
    delete req.body.updatedAt

    if(req.body.hasOwnProperty('password')){
        req.body.password = await bcrypto.hash(req.body.password, 8)
    }

    const {error, value} = User.joiValidationForUpdate (req.body)
    if(error) {

        next(createError(400,error))

    }else {

        try{
            const result = await User.findByIdAndUpdate({_id:req.user._id}, req.body, 
                {new:true, runValidators:true})
                
            if(result){
                return res.json(result)
            }else{
                return res.status(404).json({
                    message: "User not found",
                })
            }
    
    
        }catch(err){
    
            next(err)
    
        }

    }

}

const login = async (req,res,next) => {

    try{

        const user = await User.login(req.body.email, req.body.password)
        const token = await user.generateToken()
        res.json({
            user,
            token
        })

    }catch(error){

        next(error)

    }


}

const deleteMe = async (req,res,next) => {
    try{
        const result = await User.findById({_id:req.user._id})
        if(result){
            return res.json({
                message: "User deleted",
            })
        }else{
            throw createError(404, 'User not found')
        }
    } catch(err) {
        next(createError(400, err))
    }
}

module.exports = {
    loggedInUserInfo,
    loggedInUserUpdate,
    login,
    deleteMe
}