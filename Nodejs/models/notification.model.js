const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    parentsId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },

    picture: {
        type: String,
        default: '',
        required: false,
    }
})

var Notification = mongoose.model('Notification', notificationSchema );

module.exports = Notification
