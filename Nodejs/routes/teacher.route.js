const express = require('express')
const Router = express.Router()

const controller = require('../controllers/teacher.controller')

Router.get("/", controller.showInfoTeacher)

Router.post('/create', controller.createAccountTeacher)

Router.post('/edit', controller.editAccountTeacher)

Router.post('/delete', controller.deleteAccountTeacher)

module.exports = Router;