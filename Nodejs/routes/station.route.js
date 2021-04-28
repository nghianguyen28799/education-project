const express = require('express')
const Router = express.Router()

const controller = require('../controllers/station.controller')

Router.post('/create', controller.create);

Router.post('/edit', controller.edit)

Router.post('/remove', controller.remove)

Router.get('/show', controller.show);

module.exports = Router;