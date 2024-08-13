const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    id: {
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
    chepterId: {
        type: Schema.Types.ObjectId,
        ref: 'Chepter',
        required: true
    },
    questionNo: {
        type: Number,
        required: true
    },
    questions: {
        type: String,
        required: true
    },
    options: {
        type: Object, 
        required: true
    },
    rightAns: {
        type: Number,
        required: true
    }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
