const express = require('express')
const Router = express.Router()

const controller = require('../controllers/users.controller')
const authMiddleWare = require('../middleware/auth.middleware')

Router.post("/create", controller.create)

Router.post("/edit", controller.edit)

Router.post("/delete", controller.delete)

Router.post("/login", controller.login)

Router.post('/logout', authMiddleWare, controller.logout)

Router.post('/getUserFromToken', authMiddleWare, controller.getUserFromToken)

Router.get("/", controller.showUsers)

module.exports = Router;