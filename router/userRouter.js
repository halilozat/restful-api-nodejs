const router = require('express').Router()

router.get('/', (req,res) => {
    res.json({message:"All users will be listed"})
})

router.get('/:id', (req,res) => {
    res.json({message:"All users with id: " +req.params.id+ " will be listed"})
})

router.post('/', (req,res) => {
    res.json(req.body)
})

router.patch('/:id', (req,res) => {
    res.json({
        message:"User with id: " +req.params.id+ " will be updated " + JSON.stringify(req.body) + "..."
    })
})


router.delete('/:id', (req,res) => {
    res.json({
        message:"User with id: " +req.params.id+ " will be deleted "
    })
})

module.exports = router