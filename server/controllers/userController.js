const userService = require('../services/userService');

async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.status(201).json(users);
  } catch (error) {
    console.error('Erreur :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

async function createUser(req, res) {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);
    res.status(201).json(user);
  } catch (error) {
    console.error('Erreur lors de la création de utilisateur :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}
async function getUserById(req, res) {
  const userId = req.params.id;
  try {
    const user = await userService.getUserById(userId);
    res.json(user);
  } catch (error) {
    console.error(`Erreur ${userId} :`, error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}
async function getUserByRole(req, res) {
  // const role = req.params.role;
  try {
      const users = await userService.getUserByRole();
      res.json(users);
  } catch (error) {
      console.error(`Erreur lors de la récupération des utilisateurs pour le rôle ${role} :`, error);
      res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

async function updateUser(req, res) {
  const userId = req.params.id;
  const userData = req.body;
  try {
    const user = await userService.updateUser(userId, userData);
    res.json(user);
  } catch (error) {
    console.error(`Erreur ${userId} :`, error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}
async function deleteUser(req, res) {
  const userId = req.params.id;
  try {
    const user = await userService.deleteUser(userId);
    res.json(user);
  } catch (error) {
    console.error(`Erreur lors de la suppression ${userId} :`, error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}
module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getUserByRole
};
