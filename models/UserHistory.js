const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

// Assuming the Question schema is defined in another file
const Question = require('./questions'); // Adjust the path as necessary

const userHistorySchema = new Schema({
    historyId: {
        type: Number,
        unique: true
    },
    userId: {
        type: Number,
        required: true
    },
    stdId: {
        type: Number,
        required: true
    },
    subId: {
        type: Number,
        required: true
    },
    chepterId: {
        type: Number,
        required: true
    },
    queid: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    },
    user_answer: {
        type: String,
        required: true
    },
    correct_answer: {
        type: String,
        required: true
    },
    is_correct: {
        type: Boolean,
        required: true
    }
});

userHistorySchema.plugin(AutoIncrement, {inc_field: 'historyId'});

const UserHistory = mongoose.model('UserHistory', userHistorySchema);

module.exports = UserHistory;
