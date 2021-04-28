const Chat = require("../models/chat.model");
const { response } = require("../routes/index.route");

module.exports = {
    checkRoom: async(req, res) => {
        const room = req.body.room;
        const isCheck = await Chat.findOne({ room: room })
        if(!isCheck) {
            Chat.create({
                room: room,
                messages: []  
            }).then(() => {
                res.json({create: true})
            })
        }
    },

    showMessages: async(req, res) => {
        const room = req.body.room;
        Chat.find({ room: room })
        .then(data =>{
            res.json(data)
        })
    },

    showUserList: async(req, res) => {
        const { id } = req.body;
        const chatData = await Chat.find()
        const userList = chatData.filter(data => {
            const room = data.room;
            const getId = room.slice(0, room.indexOf("_"));
            return getId === id
        })
        res.send(userList)
    },
}