const { find } = require("../models/supervisorSchedule.model");
const Notification = require("../models/notification.model");
const User = require("../models/users.model");

module.exports = {
    create: async(req, res) => {
        const picture = req.body.picture;
        Notification.create({
            parentsId: req.body.parentsId,
            title: req.body.title,
            content: req.body.content,
            date: new Date(),
            status: false,
            picture: picture ? picture : '',
        }).then(() => {
            res.sendStatus(200)
        })
    },

    pushNotification: async(req, res) => {
        const parentsId = req.body.parentsId;
        User.findOne({ _id: parentsId })
        .then(data => {
            res.send(data.tokens)
        }).catch(err => {
            console.log('error: ', err);
        })
    },

    show: async(req, res) => {
        // const parentsId = "60753d4a0a9c90489814ea8b";
        const parentsId = req.body.parentsId;
        const getNotifi = await Notification.find({
            parentsId: parentsId
        }).sort({date: -1}).limit(10)
        res.send(getNotifi)
    },

    editStatus: async(req, res) => {
        const id = req.body.id;
        await Notification.updateOne({_id: id}, {status: true})
        .then(() => {
            res.sendStatus(200)
        })
    }
}