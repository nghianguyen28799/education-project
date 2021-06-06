const express = require('express')
const Router = express.Router()

const controller = require('../controllers/student.controller')

const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload/images/students")
    },
    filename: function (req, file, cb) {
        console.log(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
})

const uploadUser = multer({storage: storage});

Router.get("/", controller.showStudent)

Router.post('/create', controller.createStudent)

Router.post('/edit', controller.editStudent)

Router.post('/delete', controller.deleleStudent)

Router.post('/getStudentById', controller.getStudentById)

Router.post('/getStudentByParentsId', controller.getStudentByParentsId)

Router.post('/getStudentByClassCode', controller.getStudentByClassCode)

Router.get('/getStudentToScan/:id', controller.getStudentToScan)

Router.post('/getAttendanceSuccessly', controller.getAttendanceSuccessly)

Router.post('/changeStudentAvatar',  uploadUser.single('photo'), controller.changeStudentAvatar)

Router.post('/defaultPicture', controller.defaultPicture)

module.exports = Router;