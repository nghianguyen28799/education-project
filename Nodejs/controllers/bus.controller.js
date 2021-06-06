const Bus = require("../models/bus.model");
const Teacher = require("../models/teacher.model");
module.exports = {
    create: async(req, res) => {
        const isTeacher = await Teacher.find({ permission: 'supervisor' })

        Bus.create({
            licensePlate: req.body.licensePlates,
            supervisorId: isTeacher[req.body.supervisor]._id,
        }).then(() => {
            res.sendStatus(200)
        })
    },

    edit: async(req, res) => {
        const isTeacher = await Teacher.find({ permission: 'supervisor' })

        Bus.updateOne({ _id: req.body.id },{
            licensePlate: req.body.licensePlates,
            supervisorId: isTeacher[req.body.supervisor]._id,
        }).then(() => {
            res.sendStatus(200)
        })
    },

    remove: async(req, res) => {
        Bus.deleteOne({ _id: req.body.id })
        .then(() => {
            res.sendStatus(200)
        })
    },

    show: async(req, res) => {
        Bus.find()
        .then(data => {
            res.send(data)
        })     
    },

    getData: async(req, res) => {
        Bus.find()
        .then(data => {
            res.send(data)
        })
    },

    getDataById: async(req, res) => {
        const id = req.body.id;
        Bus.findOne({ supervisorId: id })
        .then(data => {
            res.send(data);
        })
    }
}