const mongoose = require('mongoose');
// const validator = require('validator');

const Schema = mongoose.Schema;

const registerBusSchema = new Schema({
    parentsId: {
        type: String,
        required: true,
    },

    listBookStation: {
        type: [
            {
                date: Date,
                station: String,
                getOnBusFromHouse: Boolean,
                getOutBusFromHouse: Boolean,
                getOnBusFromSchool: Boolean,
                getOutBusFromSchool: Boolean,
                supervisorId: String,
            }
        ],
        required: true,
    }

})

var RegisterBus = mongoose.model('RegisterBus', registerBusSchema);

module.exports = RegisterBus
