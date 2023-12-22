const User = require('../models/user_models')
const userService = require('../service/user-service')
const {validationResult, cookie} = require('express-validator')
const ApiError = require('../exceptions/api-error')

class UserController { 
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {email, password, userName} = req.body
            const userData = await userService.registration(email, password, userName)
            res.cookie('refreshToken', (await userData).refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.status(200).json(userData)
        } catch (e) {
            next(e)
        }
    }


    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', (await userData).refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        } 
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            
        }
    }

    async activate(req, res, next) {
        
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers()
            return res.status(200).json({users: users})
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController()