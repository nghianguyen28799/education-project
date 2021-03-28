const express = require('express')
const Router = express.Router()

const controller = require('../controllers/absence.controller')

Router.post('/create', controller.create)

// Router.post('/show', controller.show)

module.exports = Router;