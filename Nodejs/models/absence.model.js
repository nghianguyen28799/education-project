const mongoose = require('mongoose');
// const validator = require('validator');

const Schema = mongoose.Schema;

const absenceSchema = new Schema({
    parentsId: {
        type: String,
        required: true,
    },

    classCode: {
        type: String,
        required: true,
    },

    dates: {
        type: [
            {
                date: Date,
                lesson: Array
            }
        ],
        required: true,
    },

    reason: {
        type: String,
        required: true,
    },

})

var Absence = mongoose.model('Absence', absenceSchema);

module.exports = Absence
