const express = require('express')
const Router = express.Router()

const controller = require('../controllers/users.controller')

Router.post("/create", controller.create)

Router.post("/edit", controller.edit)

Router.post("/delete", controller.delete)

Router.post("/login", controller.login)

Router.get("/", controller.showUsers)

module.exports = Router;