const User = require('../models/userModel')
const createError = require('http-errors')
const bcrypto = require('bcrypt')


const listAllUsers = async (req,res) => {
    const allUsers = await User.find({})
    res.json(allUsers)
}

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

const createNewUser = async (req,res,next) => {
   
    try{
        const addedUser = new User(req.body)

        //hashed
        addedUser.password = await bcrypto.hash(addedUser.password, 8)


        const {error, value} = addedUser.joiValidation(req.body)
        if(error){
            next(createError(400,error))
        }else{
            const result = await addedUser.save()
            res.json(result)
        }

        
    }catch(err){
        next(err)
        //console.log("user save error "+err)
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

const adminUserUpdate = async (req,res,next) => {
    
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
            const result = await User.findByIdAndUpdate({_id:req.params.id}, req.body, 
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

const deleteAll = async (req,res,next) => {
    try{
        const result = await User.deleteMany({isAdmin: false})
        if(result){
            return res.json({
                message: "All users deleted",
            })
        }else{
            throw createError(404, 'User not found')
        }
    } catch(err) {
        next(createError(400, err))
    }
}

const deleteById = async (req,res,next) => {
    try{
        const result = await User.findById({_id:req.params.id})
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
    listAllUsers,
    loggedInUserInfo,
    loggedInUserUpdate,
    createNewUser,
    login,
    adminUserUpdate,
    deleteAll,
    deleteMe,
    deleteById
}