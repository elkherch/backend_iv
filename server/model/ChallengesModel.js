const mongoose = require('mongoose');
const User = require('./UserModels'); // Ensure your user model is correctly imported

const challengeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    description: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: false 
    },
    deadline: {
        type: Date,
        required: true
    },
    organizer_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    organizer_email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    }
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
