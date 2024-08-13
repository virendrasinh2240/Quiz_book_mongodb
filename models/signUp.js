const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const signUpSchema = new Schema({
    userId: {
        type: Number,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    genderId: {
        type: Object,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d+$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    professionId: {
        type: Object,
        required: true
    },
    userProfile: {
        type: String,
        default: null
    }
});

signUpSchema.plugin(AutoIncrement, {inc_field: 'userId'});

const SignUp = mongoose.model('SignUp', signUpSchema);

module.exports = SignUp;
