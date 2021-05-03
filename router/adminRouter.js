const router = require('express').Router()
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')
const adminController = require('../controllers/adminController')


//Only admin list all users
router.get('/', [authMiddleware,adminMiddleware], adminController.listAllUsers)

// Create new user
router.post('/', adminController.createNewUser)

//Admin can update user information
router.patch('/:id', adminController.adminUserUpdate)

//Delete all users
router.get('/deleteAll', [authMiddleware,adminMiddleware], adminController.deleteAll)

//User can be deleted by id
router.delete('/:id', [authMiddleware,adminMiddleware], adminController.deleteById)


module.exports = router