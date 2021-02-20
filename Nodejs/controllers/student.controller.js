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
            sex: req.body.sex,
            classCode: req.body.classCode,
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

        const action = {
            name: req.body.name,
            birthday: req.body.birthday,
            sex: req.body.sex,
            classCode: req.body.classCode,
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
    }
}