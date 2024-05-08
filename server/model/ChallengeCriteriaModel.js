const mongoose = require('mongoose');
const Criteria = require('./Criteria');
const Challenge = require('./ChallengesModel');

const challengeCriteriaSchema = new mongoose.Schema({
    challenge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Challenge',
        required: true
    },
    criteria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Criteria',
        required: true
    }
});

const ChallengeCriteria = mongoose.model('ChallengeCriteria', challengeCriteriaSchema);

module.exports = ChallengeCriteria;
