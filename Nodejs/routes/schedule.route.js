const express = require('express')
const Router = express.Router()

const controller = require('../controllers/schedule.controller')

Router.post('/create', controller.create)

Router.post('/show', controller.show)

Router.post('/edit', controller.edit)

module.exports = Router;