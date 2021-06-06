const express = require('express')
const Router = express.Router()

const controller = require('../controllers/registerBus.controller')

Router.post('/create', controller.create)

Router.post('/show', controller.show)

Router.post('/attendance', controller.attendance)

Router.post('/showAllList', controller.showAllList)

Router.post('/updateDate', controller.updateDate)

Router.post('/sendRequire', controller.sendRequire)

Router.post('/showByIdAndDate', controller.showByIdAndDate)

module.exports = Router;