const express = require('express')
const Router = express.Router()

const controller = require('../controllers/users.controller')
const authMiddleWare = require('../middleware/auth.middleware')

const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload/images/users")
    },
    filename: function (req, file, cb) {
        console.log(file.originalname);
        cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
})
const uploadUser = multer({storage: storage});

Router.post("/create", controller.create)

Router.post("/edit", controller.edit)

Router.post("/delete", controller.delete)

Router.post("/login", controller.login)

Router.post('/logout', authMiddleWare, controller.logout)

Router.post('/getUserFromToken', authMiddleWare, controller.getUserFromToken)

Router.post('/getUserFromClass', controller.getUserFromClass)

Router.post('/getUserById', controller.getUserById)

Router.post('/changeInfoParents', controller.changeInfoParents)

Router.post('/changeAvatarParents', uploadUser.single('photo'), controller.changeAvatarParents)

Router.post('/changePasswordParents', controller.changePasswordParents)

Router.get("/", controller.showUsers)

module.exports = Router;