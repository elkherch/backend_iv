const mongoose = require('mongoose');
const User = require('./UserModels');
const Team = require('./TeamsModel');
const Challenge = require('./ChallengesModel');

const evaluationSchema = new mongoose.Schema({
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
    jury_member_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    feedback: {
        type: String,
        required: true
    }
});

const Evaluation = mongoose.model('Evaluation', evaluationSchema);

module.exports = Evaluation;
