const Bus = require("../models/bus.model");

module.exports = {
    create: async(req, res) => {
        
        Bus.create({
            licensePlate: '65A-567.89',
            supervisorId: "604eda9be0edb12bd8398e08",
        }).then(() => {
            res.send({ create: true })
        })
    },

    edit: async(req, res) => {

    },

    remove: async(req, res) => {

    },

    show: async(req, res) => {
        Bus.find()
        .then(data => {
            console.log(data);
            res.send(data)
        })     
    },
}