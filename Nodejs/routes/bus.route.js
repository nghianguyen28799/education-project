const express = require('express')
const Router = express.Router()

const controller = require('../controllers/bus.controller')

Router.post('/create', controller.create);

Router.post('/edit', controller.edit)

Router.post('/remove', controller.remove)

Router.post('/show', controller.show);

Router.get('/getData', controller.getData);

Router.post('/getDataById', controller.getDataById);

module.exports = Router;