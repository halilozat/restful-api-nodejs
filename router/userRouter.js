const router = require('express').Router()
const User = require('../models/userModel')
const createError = require('http-errors')
const bcrypto = require('bcrypt')


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
        console.log("user save error "+err)
    }

})


router.post('/login',async (req,res,next) => {

    try{

        const user = await User.login(req.body.email, req.body.password)
        res.json(user)

    }catch(error){

        next(error)

    }


})



router.patch('/:id',async (req,res,next) => {
    
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