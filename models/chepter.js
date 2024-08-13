const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chepterSchema = new Schema({
    chepterId: {
        type: Number,
        required: true,
        unique: true
    },
    stdId: {
        type: Number,
        required: true
    },
    subId: {
        type: Number,
        required: true
    },
    chepterNo: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        default: null
    },
    teacher: {
        type: String,
        default: null
    },
    que: {
        type: Number,
        required: true
    },
    min: {
        type: String,
        default: null
    }
});

// Assuming Question schema is defined in another file
const Question = require('./questions'); // Adjust the path as necessary

chepterSchema.virtual('questions', {
    ref: 'Question',
    localField: '_id',
    foreignField: 'chepterId'
});

const Chepter = mongoose.model('Chepter', chepterSchema);

module.exports = Chepter;
