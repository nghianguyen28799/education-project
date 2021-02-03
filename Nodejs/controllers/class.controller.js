const Class = require("../models/class.model");
const { response } = require("../routes/index.route");

module.exports = {
    showClass: (req, res) => {
        Class.find()
        .then(data => {
            res.send(data);
        })
    },

    createClass: async(req, res) => {
        const data = {
            ClassCode: req.body.classCode,
            Room: req.body.room,
            Teacher: req.body.teacher,
        }
        await Class.create(data)
        .then(() => {
            res.json({created: true})
        })
        .catch(error => {
            console.log(error);
        }) 
    },

    editClass: async(req, res) => {
        const condition = {
            _id: req.body.id
        }

        const action = {
            ClassCode: req.body.classCode,
            Room: req.body.room,
            Teacher: req.body.teacher,
        }
        console.log(action);
        await Class.updateOne(condition, action)
        .then(() => {
            res.json({ updated: true })
        })
        .catch(error => {
            console.log(error);
        })
    },

    deleleClass: async(req, res) => {
        const id = req.body.id
     
        await Class.deleteOne({ _id: id })
        .then(() => {
            res.json({ deleted: id })
        })
        .catch(error => {
            console.log(error);
        })
    }
}