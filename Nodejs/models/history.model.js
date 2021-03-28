const mongoose = require('mongoose');
// const validator = require('validator');

const Schema = mongoose.Schema;

const historySchema = new Schema({
    parentsId: {
        type: String,
        required: true,
    },

    events: {
        type: [
            { name: String, date: Date },
        ],
        required: true,
    },
})

var History = mongoose.model('History', historySchema);

module.exports = History
