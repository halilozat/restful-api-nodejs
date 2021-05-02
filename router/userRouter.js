const router = require('express').Router()

const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')
const userController = require('../controllers/userController')

//Only admin list all users
router.get('/', [authMiddleware,adminMiddleware], userController.listAllUsers)

//Logged in user can list their information
router.get('/me', authMiddleware, userController.loggedInUserInfo)

//Logged in user can update their information
router.patch('/me', authMiddleware, userController.loggedInUserUpdate)

// Create new user
router.post('/', userController.createNewUser)

//login
router.post('/login',userController.login)

//Admin can update user information
router.patch('/:id', userController.adminUserUpdate)

//Delete all users
router.get('/deleteAll', [authMiddleware,adminMiddleware], userController.deleteAll)

//User can be deleted by id
router.delete('/:id', [authMiddleware,adminMiddleware], userController.deleteById)

//Delete me account
router.delete('/me', authMiddleware, userController.deleteMe)



module.exports = router