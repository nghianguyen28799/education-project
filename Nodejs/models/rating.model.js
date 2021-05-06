const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    parentsId: {
        type: String,
        required: true,
    },

    studentId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true
    },
}, {timestamps: true}
)


var Rating = mongoose.model('Rating', RatingSchema, 'rating');

module.exports = Rating
