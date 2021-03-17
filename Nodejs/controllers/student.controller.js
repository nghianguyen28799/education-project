const Student = require("../models/student.model");
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
        console.log(req.body);
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
    }
}