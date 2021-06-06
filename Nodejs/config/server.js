const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors');

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/upload', express.static('upload'))

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
    console.log("User da ket noi");

    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room })
        // console.log(user);
        if(error) return callback(error);
  
        socket.join(user.room)
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)

        io.to(user.room).emit('message', { user: user.name, data: message })
 
        Chat.findOne({ room: user.room })
        .then(data => {
            const { messages } = data;
            messages.unshift(message[0]);
            const newMessages = messages
            const condition = {room: user.room}
            const handler = { messages: newMessages }
            Chat.updateOne(condition, handler)
            .then(() => {})
        })
    })

    socket.on('leaveroom', () => {
        // console.log(name);
        // console.log(room);
        removeUser({ id: socket.id });
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