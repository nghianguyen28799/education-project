const Student = require("../models/student.model");
const User = require("../models/users.model");

// const { response } = require("../routes/index.route");

module.exports = {
    showStudent: (req, res) => {
        Student.find()
        .then(data => {
            res.send(data);
        })
    },

    createStudent: async(req, res) => {
        const data = {
            name: req.body.name,
            birthday: req.body.birthday,
            gender: req.body.gender,
            classCode: req.body.classCode,
            teacherCode: req.body.teacherCode,
            parentsCode: req.body.parentsCode,
            avatar: '',
            joined: req.body.joined,
            attendanceStatus: new Date(new Date().setDate(new Date().getDate()-1)),
            attendanceStatus: false
        }
        await Student.create(data)
        .then(() => {
            res.json({created: true})
        })
        .catch(error => {
            console.log(error);
        }) 
    },

    editStudent: async(req, res) => {
        const condition = {
            _id: req.body.id
        }
        // console.log(req.body);
        const action = {
            name: req.body.name,
            birthday: req.body.birthday,
            gender: req.body.gender,
            classCode: req.body.classCode,
            teacherCode: req.body.teacherCode,
            parentsCode: req.body.parentsCode,
            joined: req.body.joined,
        }
        await Student.updateOne(condition, action)
        .then(() => {
            res.json({ updated: true })
        })
        .catch(error => {
            console.log(error);
        })
    },

    deleleStudent: async(req, res) => {
        const id = req.body.id
     
        await Student.deleteOne({ _id: id })
        .then(() => {
            res.json({ deleted: id })
        })
        .catch(error => {
            console.log(error);
        })
    },

    getStudentById: async(req, res) => {
        const id = req.body.id;
        await Student.findOne({ _id: id })
        .then((data) => {
            res.json(data)
        })
    },

    getStudentByParentsId: async(req, res) => {
        const id = req.body.id;
        await Student.findOne({ parentsCode: id })
        .then(data => {
            res.json(data)
        })
    },

    getStudentByClassCode: async(req, res) => {
        // const classCode = "604348f93cdf643b14041c52";
        const classCode = req.body.classCode;
        const data = await Student.find({ classCode: classCode })
        res.send(data)
    },

    getStudentToScan: async(req, res) => {
        const id = req.params.id
        const isStudent = await Student.findOne({ _id: id })
        
        if(isStudent) {
            User.findOne({ _id: isStudent.parentsCode })
            .then(data => {
                res.send({student: isStudent, tokens: data.tokens});
            })
        } else {
            res.send({})
        }
    },

    getAttendanceSuccessly: async(req, res) => {
        const id = req.body.id
        const isStudent = await Student.findOne({ _id: id })

        if(isStudent) {
            const condition = {
                _id: id
            }

            const handler = {
                attendanceDay : new Date(),
                attendanceStatus : true
            }

            Student.updateOne(condition, handler)
            .then((data) => {

                res.send(data)
            })
        } else {
            res.send(200)
        }
    },

    changeStudentAvatar: async(req, res) => {
        const { path } = req.file;
        const id = req.body._id;
        const condition = { _id: id }
        const handler = {
            avatar: path
        }
        await Student.updateOne(condition, handler)
        .then(() => {
            res.send({uri: path})
        }).catch(error => {
            res.send({error: error})
        })   
    },

    defaultPicture: async(req, res) => {
        Student.updateOne({ _id: req.body.id }, {avatar: ''})
        .then(() => {
            res.send({ success: true})
        })
    }
}