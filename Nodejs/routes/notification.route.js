const express = require('express')
const Router = express.Router()

const controller = require('../controllers/notification.controller')

Router.post('/create', controller.create)

Router.post('/show', controller.show)

Router.post('/pushNotification', controller.pushNotification)

Router.post('/editStatus', controller.editStatus)

module.exports = Router;