const express = require('express')
const Router = express.Router()

const controller = require('../controllers/rating.controller')

Router.post('/create', controller.create);

Router.post('/edit', controller.edit)

Router.post('/show', controller.show);

module.exports = Router;