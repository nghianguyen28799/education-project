const express = require('express')
const Router = express.Router()

const controller = require('../controllers/student.controller')

Router.get("/", controller.showStudent)

Router.post('/create', controller.createStudent)

Router.post('/edit', controller.editStudent)

Router.post('/delete', controller.deleleStudent)

module.exports = Router;