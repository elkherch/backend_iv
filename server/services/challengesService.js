const Challenges = require('../model/ChallengesModel');

class ChallengesService {
    async createChallenges(challengesData) {
        try {
            const challenge = await Challenges.create(challengesData);
            return challenge;
        } catch (error) {
            console.error('Erreur lors de la création du défi :', error);
            throw error;
        }
    }

    async getAllChallenges() {
        try {
            const challenges = await Challenges.find();
            return challenges;
        } catch (error) {
            console.error('Erreur lors de la récupération des défis :', error);
            throw error;
        }
    }

    async getChallengesById(challengesId) {
        try {
            const challenge = await Challenges.findById(challengesId);
            if (!challenge) {
                throw new Error('Défi non trouvé');
            }
            return challenge;
        } catch (error) {
            console.error(`Erreur lors de la récupération du défi ${challengesId} :`, error);
            throw error;
        }
    }

    async updateChallenges(challengesId, challengesData) {
        try {
            const challenge = await Challenges.findByIdAndUpdate(challengesId, challengesData, { new: true });
            if (!challenge) {
                throw new Error('Défi non trouvé');
            }
            return challenge;
        } catch (error) {
            console.error(`Erreur lors de la mise à jour du défi ${challengesId} :`, error);
            throw error;
        }
    }

    async deleteChallenges(challengesId) {
        try {
            const challenge = await Challenges.findByIdAndDelete(challengesId);
            if (!challenge) {
                throw new Error('Défi non trouvé');
            }
            return challenge;
        } catch (error) {
            console.error(`Erreur lors de la suppression du défi ${challengesId} :`, error);
            throw error;
        }
    }
}

module.exports = new ChallengesService();
