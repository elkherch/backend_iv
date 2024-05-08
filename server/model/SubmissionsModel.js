const mongoose = require('mongoose');
const Teams = require('./TeamsModel.js');
const Challenges = require('./ChallengesModel.js');

const submissionSchema = new mongoose.Schema({
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge',
        required: true
    },
    file_path: {
        type: String,
        required: true
    },
    submitted_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
