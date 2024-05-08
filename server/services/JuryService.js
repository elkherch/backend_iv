const Teams = require('../model/TeamsModel');
const Challenges = require('../model/ChallengesModel');

async function fetchChallengeDetails(challengeId) {
    try {
        const challenge = await Challenges.findByPk(challengeId);
        if (!challenge) {
            throw new Error('Défi non trouvé');
        }
        return challenge;
    } catch (error) {
        console.error('Erreur lors de la récupération des détails du défi:', error);
        throw error;
    }
}

async function fetchTeamDetails(teamId) {
    try {
        const team = await Teams.findByPk(teamId);
        if (!team) {
            throw new Error('Équipe non trouvée');
        }
        return team;
    } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'équipe:', error);
        throw error;
    }
}

module.exports = {
    fetchChallengeDetails,
    fetchTeamDetails,
};
