const router = require('express').Router()

const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')
const userController = require('../controllers/userController')


//Logged in user can list their information
router.get('/me', authMiddleware, userController.loggedInUserInfo)

//Logged in user can update their information
router.patch('/me', authMiddleware, userController.loggedInUserUpdate)

//login
router.post('/login',userController.login)

//Delete me account
router.delete('/me', authMiddleware, userController.deleteMe)



module.exports = router