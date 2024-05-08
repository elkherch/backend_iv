const Teams = require('../model/TeamsModel');
const ErrorHandler = require('../ErrorHandler')
class TeamService {
    async  emailAlreadyUsed(email, excludeTeamId = null) {
        const query = {
            $or: [
                { leader_email: email },
                { co_leader_email: email },
                { member_emails: email }
            ]
        };
        if (excludeTeamId) {
            query._id = { $ne: excludeTeamId };  // Exclure l'ID d'une équipe en particulier de la recherche (utile pour la mise à jour)
        }
        const team = await Teams.findOne(query);
        return !!team;  // Renvoie true si un email est déjà utilisé, false autrement
    }
    
    async createTeams(teamData) {
        try {
            if (!Array.isArray(teamData.member_emails)) {
                throw new ErrorHandler('Member emails should be an array', 400);
            }
    
            if (teamData.co_leader_email && await this.emailAlreadyUsed(teamData.co_leader_email)) {
                throw new ErrorHandler('L\'email du co-leader est déjà utilisé par une autre équipe', 400);
            }
    
            for (const email of teamData.member_emails) {
                if (await this.emailAlreadyUsed(email)) {
                    throw new ErrorHandler(`L\'email du membre ${email} est déjà utilisé par une autre équipe`, 400);
                }
            }
    
            const team = await Teams.create(teamData);
            return team;
        } catch (error) {
            console.error('Erreur lors de la création de l\'équipe :', error);
            throw error;
        }
    }
    

    async getAllTeams() {
        try {
            const teams = await Teams.find();
            return teams;
        } catch (error) {
            console.error('Erreur :', error);
            throw error;
        }
    }

    async getTeamById(teamId) {
        try {
            const team = await Teams.findById(teamId);
            if (!team) {
                throw new Error('Équipe non trouvée');
            }
            return team;
        } catch (error) {
            console.error(`Erreur ${teamId} :`, error);
            throw error;
        }
    }

    async updateTeam(teamId, teamData) {
        try {
            const team = await Teams.findByIdAndUpdate(teamId, teamData, { new: true });
            if (!team) {
                return { message: 'Équipe non trouvée' };
            }
            return team;
        } catch (error) {
            console.error(`Erreur lors de la mise à jour de l'équipe avec ID ${teamId} :`, error);
            throw error;
        }
    }

    async deleteTeam(teamId) {
        try {
            // Use an object with _id property to specify which document to delete
            const result = await Teams.deleteOne({ _id: teamId });
    
            // The result object contains information about the operation
            // result.deletedCount will be 1 if a document was deleted
            if (result.deletedCount === 0) {
                throw new Error('Équipe non trouvée');
            }
    
            // There's no need to call destroy() because the document is already deleted
            // Return some indication that the delete was successful
            return { message: 'Équipe supprimée avec succès' };
        } catch (error) {
            console.error(`Erreur lors de la suppression de l'équipe avec ID ${teamId} :`, error);
            throw error;
        }
    }
}

module.exports = new TeamService();
