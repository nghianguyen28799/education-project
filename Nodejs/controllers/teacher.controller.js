const Teacher = require("../models/teacher.model");
const Class = require("../models/class.model");
const { response } = require("../routes/index.route");

module.exports = {
    showInfoTeacher: (req, res) => {
        Teacher.find()
        .then(data => {
            res.send(data);
        })
    },

    createAccountTeacher: async(req, res) => {
        try {
            const classCode = await Class.find();  
            const user = new Teacher ({
                userName: req.body.userName,
                password: req.body.password,
                FullName: req.body.name,
                Email: req.body.email,
                NumberPhone: req.body.numberPhone,
                Gender: req.body.Gender,
                Avatar: '',
                BirthDay: req.body.birthDay,
                Identification: req.body.identification,
                HomeTown: req.body.hometown,
                Worked: req.body.worked,
                permission: req.body.permission,
                ClassCode: classCode[req.body.classCode]._id
            })
            // console.log(user);
            await user.save();
        } catch (error) {
            res.status(400).send(error)
        }
    },

    editAccountTeacher: async(req, res) => {
        const classCode = await Class.find();  
        const checkPass = req.body.password.indexOf('*');
        const isTeacher = await Teacher.findOne({ _id: req.body.id })
        if(checkPass == -1) {
            const newInfo = {
                userName: req.body.userName,
                password: req.body.password,
                FullName: req.body.name,
                Email: req.body.email,
                NumberPhone: req.body.numberPhone,
                Gender: req.body.Gender,
                Avatar: '',
                BirthDay: req.body.birthDay,
                Identification: req.body.identification,
                HomeTown: req.body.hometown,
                Worked: req.body.worked,
                permission: req.body.permission,
                ClassCode: classCode[req.body.classCode]._id
            }
            await isTeacher.changeInfo(newInfo)
        } else {
            const newInfo = {
                userName: req.body.userName,
                FullName: req.body.name,
                Email: req.body.email,
                NumberPhone: req.body.numberPhone,
                Gender: req.body.Gender,
                Avatar: '',
                BirthDay: req.body.birthDay,
                Identification: req.body.identification,
                HomeTown: req.body.hometown,
                Worked: req.body.worked,
                permission: req.body.permission,
                ClassCode: classCode[req.body.classCode]._id
            }
            await isTeacher.changeInfo(newInfo)
        }
    },

    deleteAccountTeacher: async(req, res) => {
        const id = req.body.id
        console.log(id);
        await Teacher.deleteOne({ _id: id })
        .then(() => {
            res.json({ deleted: id })
        })
        .catch(error => {
            console.log(error);
        })
    },

    login: async(req, res) => {
        try {
            const userName = req.body.userName;
            const password = req.body.password;
            const teacher = await Teacher.findByCredentials(userName, password)
            if(!teacher) {
                return res.status(401).send({error: 'Login failed! Check authentication credentials'})
            }
            console.log("login success!!")
            const tokenDevices = 'abcdef';
            const token = await teacher.generateAuthToken(tokenDevices)
        
            res.send({ teacher, token });
        } catch (error) {
            // res.status(400).send(error);
            res.send({error: true})
        }
    },
    

    logout: async(req, res) => {
        const token = req.token;
        const _id = req.user;
        const user = await Teacher.find({ _id });
        await user[0].removeAuthToken(token);
    },

    getUserFromToken: async(req, res) => {
        const user = {
            _id: req.user._id,
            userName: req.user.userName,
            FullName: req.user.FullName,
            Email: req.user.Email,
            NumberPhone: req.user.NumberPhone,
            Gender: req.user.Gender,
            Avatar: req.user.Avatar,
            BirthDay: req.user.BirthDay,
            Identification: req.user.Identification,
            HomeTown: req.user.Hometown,
            Worked: req.user.Worked,
            permission: req.user.permission,
            token: req.token,
            ClassCode: req.user.ClassCode
        }
        // console.log(user);
        res.send(user)
    },

}