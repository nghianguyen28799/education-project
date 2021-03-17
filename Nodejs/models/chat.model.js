const mongoose = require('mongoose');
// const validator = require('validator');

const Schema = mongoose.Schema;

const chatSchema = new Schema({
    room: String,
    messages: Array,
})

var Chat = mongoose.model('Chat', chatSchema, 'chat');

module.exports = Chat


