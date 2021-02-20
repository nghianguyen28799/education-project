const Chat = require("../models/chat.model");
const { response } = require("../routes/index.route");

module.exports = {
    checkRoom: async(req, res) => {
        const room = req.body.room;
        await Chat.findOne({ userId: room })
        .then(data => {
            if(!data) {
                Chat.create({
                    userId: room,
                    messages: []  
                }).then(data => {
                    res.json({create: true})
                })
            }
        })
    },

    showMessages: async(req, res) => {
        const room = req.params.room;
        Chat.find({ userId: room })
        .then(data =>{
            res.json(data)
        })
    }
}