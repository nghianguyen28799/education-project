const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const classSchema = new Schema({
    ClassCode: {
        type: String,
        required: true,
    },
    Room: {
        type: String,
        required: true,
    },
})

var Class = mongoose.model('Class', classSchema, 'classes');

module.exports = Class


