const express = require('express')
const Router = express.Router()

const controller = require('../controllers/chat.controller')

Router.post('/checkroom', controller.checkRoom)

Router.get('/showMessages/:room', controller.showMessages)

module.exports = Router;