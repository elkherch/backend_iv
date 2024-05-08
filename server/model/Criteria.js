const mongoose = require('mongoose');

const criteriaSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    criteria_id: {
        type: Number,
        required: true
    }
});

const Criteria = mongoose.model('Criteria', criteriaSchema);

module.exports = Criteria;
