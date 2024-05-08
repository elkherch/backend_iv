const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function(value) {
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});


const User = mongoose.model('User', userSchema);
module.exports = User ;
