const express = require('express')
const Router = express.Router()

const controller = require('../controllers/registerBus.controller')

Router.post('/create', controller.create)

Router.post('/show', controller.show)

Router.post('/attendance', controller.attendance)

Router.post('/showAllList', controller.showAllList)

module.exports = Router;