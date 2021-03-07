const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

const bodyParser = require('body-parser')
const cors = require('cors');

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// START socket io

const socketio = require('socket.io');
const http = require('http')
const server = http.createServer(app);
const io = socketio(server, {
    cors:true,
    // origins:["http://127.0.0.1:3000"],
})

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const Chat = require("../models/chat.model");
io.on('connection', (socket) => {
    console.log('We have a new connection !!');

    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room })

        if(error) return callback(error);
        
        // socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` })
        // socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!`})
        
        socket.join(user.room)
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: message })
        

        Chat.findOne({ userId: user.room })
        .then(data => {
            // console.log(data.messages);
            const { messages } = data;
            const condition = {userId: user.room}
            const info = {
                name: user.name,
                text: message
            }
            const action = { messages: [...messages, info] }
            Chat.updateOne(condition, action)
            .then(() => {})
        })
    })

    socket.on('disconnect', () => {
        console.log('User had left !!');
    })
})



// END socket io

server.listen(port, () => console.log(`Server has started on port ${port}`));

const Route = require("../routes/index.route");

app.use(Route)

module.exports = app