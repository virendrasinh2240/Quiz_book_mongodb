const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

// Assuming the Chepter schema is defined in another file
const Chepter = require('./chepter'); // Adjust the path as necessary

const subjectSchema = new Schema({
    subId: {
        type: Number,
        unique: true
    },
    stdId: {
        type: Number,
        required: true
    },
    subjectName: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: null
    }
});

subjectSchema.plugin(AutoIncrement, {inc_field: 'subId'});

subjectSchema.virtual('chepters', {
    ref: 'Chepter',
    localField: '_id',
    foreignField: 'subId'
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
