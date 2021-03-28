const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StationSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    gps: {
        type: Object,
        required: true,
    }
})

var Station = mongoose.model('Station', StationSchema);

module.exports = Station
