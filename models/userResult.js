const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const userResultSchema = new Schema({
    resultId: {
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
        type: Number,
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

userResultSchema.plugin(AutoIncrement, {inc_field: 'resultId'});

const UserResult = mongoose.model('UserResult', userResultSchema);

module.exports = UserResult;
