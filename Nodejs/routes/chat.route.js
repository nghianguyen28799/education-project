const express = require('express')
const Router = express.Router()

const controller = require('../controllers/chat.controller')

Router.post('/checkroom', controller.checkRoom)

Router.post('/showMessages', controller.showMessages)

Router.post('/showUserList', controller.showUserList)

module.exports = Router;