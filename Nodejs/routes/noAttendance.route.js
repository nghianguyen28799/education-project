const express = require('express')
const Router = express.Router()

const controller = require('../controllers/noAttendance.controller')

Router.post('/create', controller.create)

Router.post('/show', controller.show)

Router.post('/editReason', controller.editReason)

Router.get('/getData', controller.getData)

module.exports = Router;