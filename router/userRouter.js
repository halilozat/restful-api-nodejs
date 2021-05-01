const router = require('express').Router()
const User = require('../models/userModel')
var createError = require('http-errors')


router.get('/', async (req,res) => {
    const allUsers =await User.find({})
    res.json(allUsers)
})

router.get('/:id', (req,res) => {
    res.json({message:"All users with id: " +req.params.id+ " will be listed"})
})

router.post('/',async (req,res,next) => {
   
    try{
        const addedUser = new User(req.body)

        const {error, value} = addedUser.joiValidation(req.body)
        if(error){
            next(createError(400,error))
        }else{
            const result = await addedUser.save()
            res.json(result)
        }

        
    }catch(err){
        next(err)
        console.log("user save error "+err)
    }

})


router.patch('/:id',async (req,res,next) => {
    
    delete req.body.createdAt
    delete req.body.updatedAt
    delete req.body.password

    const {error, value} = User.joiValidationForUpdate(req.body)
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

    

})


router.delete('/:id',async (req,res,next) => {
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
})

module.exports = router