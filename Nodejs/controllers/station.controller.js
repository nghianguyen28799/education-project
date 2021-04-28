const Station = require("../models/station.model");

module.exports = {
    create: async(req, res) => {
        const name = req.body.name;
        const address = req.body.address;
        const gps = {
            latitude: req.body.lat, 
            longitude: req.body.lng,
        }

        Station.create({
            name: name,
            address: address,
            gps: gps
        }).then(() => {
            res.sendStatus(200)
        })
    },

    edit: async(req, res) => {
        const name = req.body.name;
        const address = req.body.address;
        const gps = {
            latitude: req.body.lat, 
            longitude: req.body.lng,
        }

        Station.updateOne({_id: req.body.id},{
            name: name,
            address: address,
            gps: gps
        }).then(() => {
            res.sendStatus(200)
        })
    },

    remove: async(req, res) => {
        Station.deleteOne({_id: req.body.id}).then(() => {
            res.sendStatus(200)
        })
    },

    show: async(req, res) => {
        Station.find()
        .then(data => {;
            res.send(data)
        })     
    },
}