const express = require('express')
const Router = express.Router()

const controller = require('../controllers/teacher.controller')
const authMiddleWare = require('../middleware/auth.middleware')
const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload/images/teachers")
    },
    filename: function (req, file, cb) {
        console.log(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
})
const uploadUser = multer({storage: storage});

Router.get("/", controller.showInfoTeacher)

Router.post('/create', controller.createAccountTeacher)

Router.post('/edit', controller.editAccountTeacher)

Router.post('/delete', controller.deleteAccountTeacher)

Router.post("/login", controller.login)

Router.post('/logout', authMiddleWare, controller.logout)

Router.post('/getUserFromToken', authMiddleWare, controller.getUserFromToken)

Router.post('/getUserById', controller.getUserById);

Router.post('/changeUserInfo', controller.changeUserInfo);

Router.post('/changeUserAvatar', uploadUser.single('photo'), controller.changeUserAvatar)

Router.post('/handlePicture', uploadUser.single('photo'), controller.handlePicture)

Router.post('/changePasswordTeacher', controller.changePasswordTeacher)

Router.post('/getSupervisorInfo', controller.getSupervisorInfo)

Router.post('/defaultPicture', controller.defaultPicture);

module.exports = Router;