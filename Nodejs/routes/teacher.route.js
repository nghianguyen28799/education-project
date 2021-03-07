const express = require('express')
const Router = express.Router()

const controller = require('../controllers/teacher.controller')
const authMiddleWare = require('../middleware/auth.middleware')

Router.get("/", controller.showInfoTeacher)

Router.post('/create', controller.createAccountTeacher)

Router.post('/edit', controller.editAccountTeacher)

Router.post('/delete', controller.deleteAccountTeacher)

Router.post("/login", controller.login)

Router.post('/logout', authMiddleWare, controller.logout)

Router.post('/getUserFromToken', authMiddleWare, controller.getUserFromToken)

module.exports = Router;