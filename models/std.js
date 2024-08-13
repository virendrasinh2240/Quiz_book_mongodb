const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Assuming the Subject schema is defined in another file
const Subject = require('./subject'); // Adjust the path as necessary

const stdSchema = new Schema({
    stdId: {
        type: Number,
        required: true,
        unique: true
    },
    std: {
        type: Number,
        required: true
    }
});

stdSchema.virtual('subjects', {
    ref: 'Subject',
    localField: '_id',
    foreignField: 'stdId'
});

const Std = mongoose.model('Std', stdSchema);

module.exports = Std;
