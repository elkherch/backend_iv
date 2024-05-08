const Users = require('../model/UserModels');
const bcrypt = require('bcrypt');
const {hashSync} = require("bcrypt");


class UserService {
    async createUser(userData) {
        try {
            const pass = userData.password
            userData.password = hashSync(pass, 10)
            const user = await Users.create(userData);
            return user;
        } catch (error) {
            console.error('Erreur lors de la création de utilisateur :', error);
            throw error;
        }
    }

    async getAllUsers() {
        try {
            const users = await Users.find();
            return users;
        } catch (error) {
            console.error('Erreur :', error);
            throw error;
        }
    }

    async getUserById(userId) {
        try {
            const user = await Users.findByPk(userId);
            if (!user) {
                throw new Error('Utilisateur non trouvé');
            }
            return user;
        } catch (error) {
            console.error(`Erreur ${userId} :`, error);
            throw error;
        }
    }
    async getUserByRole() {
        try {
            const users = await Users.find({ role: 'jery' });
            if (users.length === 0) {
                throw new Error('Aucun utilisateur trouvé avec ce rôle');
            }
            return users;
        } catch (error) {
            console.error(`Erreur lors de la récupération des utilisateurs pour le rôle ${role} :`, error);
            throw error;
        }
    }
    

    async updateUser(userId, userData) {
        try {
            const user = await Users.findByPk(userId);
            if (!user) {
                throw new Error('Utilisateur non trouvé');
            }
            await user.update(userData);
            return user;
        } catch (error) {
            console.error(`Erreur ${userId} :`, error);
            throw error;
        }
    }

    async deleteUser(userId) {
        try {
            const user = await Users.deleteOne({ _id: userId });
            if (user.deletedCount === 0) {
                throw new Error('Utilisateur non trouvé');
            }
            return user;
        } catch (error) {
            console.error(`Erreur ${userId} :`, error);
            throw error;
        }
    }
    

    async authenticate(email, password) {
        try {
            const user = await Users.findOne({ email: email });
            if (!user) {
                throw new Error('Nom d\'utilisateur ou mot de passe incorrect');
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Nom d\'utilisateur ou mot de passe incorrect');
            }

            return user;
        } catch (error) {
            console.error('Erreur lors de l\'authentification :', error);
            throw error;
        }
    }
}

module.exports = new UserService();
