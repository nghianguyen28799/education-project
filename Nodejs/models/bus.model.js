const mongoose = require('mongoose');
// const validator = require('validator');

const Schema = mongoose.Schema;

const busSchema = new Schema({
    licensePlate: {
        type: String,
        required: true,
    },

    supervisorId: {
        type: String,
        required: true,
    }
})

var Bus = mongoose.model('Bus', busSchema);

module.exports = Bus
