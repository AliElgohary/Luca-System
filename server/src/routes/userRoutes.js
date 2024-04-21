const { Router } = require('express')
const userController = require('../controllers/userController')

const router = Router()

// login
router.post('/login', userController.login)

// TODO: validate only super admin users can create another users ny adding a middle ware
router.post('/', userController.createUSer)

module.exports = router
