const Router = require('express').Router
const userController = require('../controllers/user-controller')
const router = new Router()

const {body} = require('express-validator')

router.post('/login', userController.login)
router.post('/registration', body('email').isEmail(), body('password').isLength({min: 3, max: 32}), body('userName').isLength({max: 200}), userController.registration)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/users', userController.getUsers)


module.exports = router