const Station = require("../models/station.model");

module.exports = {
    create: async(req, res) => {
        // const { name, address, gps} = req.body
        // const name = "Bến Xe Trung Tâm Cần Thơ";
        // const address = "91b Đường Nguyễn Văn Linh, Hưng Lợi, Ninh Kiều, Cần Thơ";
        // const gps = {
        //     latitude: 10.023741694060448,
        //     longitude: 105.76248314870995,
        // }

        // const name = "Bến Xe Cần Thơ Mới";
        // const address = "Hưng Thành, Cái Răng, Cần Thơ";
        // const gps = {
        //     latitude: 10.004226618056919, 
        //     longitude: 105.77186086905978,
        // }

        const name = "Bên xe 3";
        const address = "6 Hùng Vương, An Hội, Ninh Kiều, Cần Thơ, Việt Nam";
        const gps = {
            latitude: 10.04501309542753, 
            longitude: 105.77956274015918
        }


        Station.create({
            name: name,
            address: address,
            gps: gps
        }).then(() => {
            res.send({ create: true })
        })
    },

    edit: async(req, res) => {

    },

    remove: async(req, res) => {

    },

    show: async(req, res) => {
        Station.find()
        .then(data => {;
            res.send(data)
        })     
    },
}