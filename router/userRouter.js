const router = require('express').Router()
const User = require('../models/userModel')

router.get('/', async (req,res) => {
    const allUsers =await User.find({})
    res.json(allUsers)
})

router.get('/:id', (req,res) => {
    res.json({message:"All users with id: " +req.params.id+ " will be listed"})
})

router.post('/',async (req,res) => {
   
    try{
        const addedUser = new User(req.body)
        const result = await addedUser.save()
        res.json(result)
    }catch(err){
        console.log("user save error "+err)
    }

})

router.patch('/:id',async (req,res) => {
    
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

        console.log("update error! "+err)

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
            
            const errorObject = new Error('User not found')
            errorObject.errorCode = 404

            throw errorObject

            /*return res.status(404).json({
                message: "User not found",
            })*/
        }
    }catch(err){
        next(err)
    }
})

module.exports = router