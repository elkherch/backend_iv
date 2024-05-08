const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    challenge_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge',
        required: true
    },
    team_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    submitted_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    submission_date: {
        type: Date,
        default: Date.now
    },
    file_path: {
        type: String,
        required: true
    },
    file_type: {
        type: String,
        required: true
    },
    comments: {
        type: String
    }
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
