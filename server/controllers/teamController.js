const teamService = require('../services/teamService');
async function getAllTeams(req, res) {
  try {
    const teams = await teamService.getAllTeams();
    res.json(teams);
  } catch (error) {
    console.error('Error fetching all teams:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function createTeams(req, res) {
  try {
    const teamsData = req.body;
    if (req.file) {
      // Here, you might want to store the file in a more permanent location or in cloud storage
      // and then set the URL to teamData.logo
      teamsData.logo = req.file.path;  // This path might need adjustment depending on your storage strategy
  }
    const team = await teamService.createTeams(teamsData);
    res.json(team);
  } catch (error) {
    console.error('Erreur lors de la création :', error);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

async function getTeamsById(req, res) {
  const teamId = req.params.id;
  try {
    const team = await teamService.getTeamById(teamId);
    res.json(team);
  } catch (error) {
    console.error(`Error fetching team with ID ${teamId}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateTeams(req, res) {
  const teamId = req.params.id;
  const teamsData = req.body;
  try {
    const team = await teamService.updateTeam(teamId, teamsData);
    res.json(team);
  } catch (error) {
    console.error(`Error updating team with ID ${teamId}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteTeams(req, res) {
  const teamId = req.params.id;
  try {
    const team = await teamService.deleteTeam(teamId);
    res.json({ message: 'Team deleted successfully', team });
  } catch (error) {
    console.error(`Error deleting team with ID ${teamId}:`, error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getAllTeams,
  createTeams,
  getTeamsById,
  updateTeams,
  deleteTeams
};
