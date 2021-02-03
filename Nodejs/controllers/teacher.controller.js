const Teacher = require("../models/teacher.model");
const { response } = require("../routes/index.route");

module.exports = {
    showInfoTeacher: (req, res) => {
        Teacher.find()
        .then(data => {
            res.send(data);
        })
    },

    createAccountTeacher: async(req, res) => {
        const data = {
            // Account: req.body.Account,
            // Password: req.body.Password,
            Name: req.body.name,
            Avatar: '',
            BirthDay: req.body.birthDay,
            Identification: req.body.identification,
            HomeTown: req.body.hometown,
            Worked: req.body.worked
        }
        await Teacher.create(data)
        .then(() => {
            res.json({ success: true });
        })
        .catch(error => {
            console.log(error);
        }) 
    },

    editAccountTeacher: async(req, res) => {
        const condition = {
            _id: req.body.id
        }

        const action = {
            Name: req.body.name,
            // Avatar: '',
            BirthDay: req.body.birthDay,
            Identification: req.body.identification,
            HomeTown: req.body.hometown,
            Worked: req.body.worked
        }

        await Teacher.updateOne(condition, action)
        .then(() => {
            res.json({ update: true })
        })
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
    }
}