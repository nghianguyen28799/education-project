const mongoose = require('mongoose');
const validator = require('validator');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    classCode: {
        type: String,
        required: true,
    },
    teacherCode: {
        type: String,
        required: true,
    },
    joined: {
        type: String,
        required: true,
    },
})

var Student = mongoose.model('Student', studentSchema);

module.exports = Student


