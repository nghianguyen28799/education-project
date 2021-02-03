const express = require('express')
const Router = express.Router()

const controller = require('../controllers/class.controller')

Router.get("/", controller.showClass)

Router.post('/create', controller.createClass)

Router.post('/edit', controller.editClass)

Router.post('/delete', controller.deleleClass)

module.exports = Router;