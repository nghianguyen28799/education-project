const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000

const socketio = require('socket.io');
const http = require('http')
const server = http.createServer(app);
const io = socketio(server, {
    cors:true,
    // origins:["http://127.0.0.1:3000"],
})

io.on('connection', (socket) => {
    console.log('We have a new connection !!');

    socket.on('disconnect', () => {
        console.log('User had left !!');
    })
})



// var connectionOptions =  {
//     "force new connection" : true,
//     "reconnectionAttempts": "Infinity", 
//     "timeout" : 10000,                  
//     "transports" : ["websocket"]
// };

// this.socket = io.connect('http://localhost:5000',connectionOptions);

module.exports = server

