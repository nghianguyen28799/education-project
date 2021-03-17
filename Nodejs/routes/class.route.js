const express = require('express')
const Router = express.Router()

const controller = require('../controllers/class.controller')

Router.get("/", controller.showClass)

Router.get("/id/:id", controller.showClassById);

Router.post('/create', controller.createClass)

Router.post('/edit', controller.editClass)

Router.post('/delete', controller.deleleClass)

Router.post("/getClassById", controller.getClassById);

module.exports = Router;