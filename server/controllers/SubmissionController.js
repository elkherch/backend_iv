// submissionsController.js
const Submission = require("../model/SubmissionModel");

const submitWork = async (req, res) => {
  const { challengeId, teamId } = req.params;
  const { userId } = req.body; // Assuming user ID is sent in the body
  try {
    const submission = new Submission({
      challenge_id: challengeId,
      team_id: teamId,
      submitted_by: userId,
      file_path: req.file.path,
      file_type: req.file.mimetype,
    });
    await submission.save();
    res.send("File uploaded and submission saved.");
  } catch (error) {
    console.error("Failed to save submission:", error);
    res.status(500).send("Error submitting work.");
  }
};

module.exports = {
  submitWork,
};
