const Evaluations = require('../model/EvaluationsModel');

/**
 * @param {number} teamId
 * @param {number} defiId 
 * @param {number} juryMemberId
 * @param {number} score 
 * @param {string} feedback
 * @returns {Promise<Object>} 
 * @throws {Error}
 */
async function gradeTeamWork(teamId, defiId, juryMemberId, score, feedback) {
    try {
        // Créer l'évaluation dans la base de données
        const evaluation = await Evaluations.create({
            challenge_id: defiId,
            team_id: teamId,
            jury_member_id: juryMemberId,
            score: score,
            feedback: feedback,
        });
        return evaluation;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    gradeTeamWork,
};
