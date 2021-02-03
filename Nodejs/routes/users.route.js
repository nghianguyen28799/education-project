const express = require('express')
const Router = express.Router()

const controller = require('../controllers/users.controller')

Router.post("/register", controller.register)

Router.post("/login", controller.login)

Router.get("/test", controller.test)

module.exports = Router;