const express = require('express')
const Router = express.Router()

const controller = require('../controllers/supervisorSchedule.controller')

Router.post('/start', controller.start)

Router.post('/end', controller.end)

Router.post('/show', controller.show)

Router.post('/showdestination', controller.showDestination)
module.exports = Router;