const nodemailer = require("nodemailer");
const juryService = require("../services/JuryService");
const evaluationService = require("../services/EvaluationService");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password",
  },
});

async function sendNotificationWithEmail(req, res) {
  const { teamId, defiId } = req.body;
  try {
    const defiDetails = await juryService.getDefiDetails(defiId);
    const teamDetails = await juryService.getTeamDetails(teamId);

    const mailOptions = {
      from: "your-email@supnum.com",
      to: teamDetails.email,
      subject: `Notification for Defi: ${defiDetails.name}`,
      text: `You have been assigned a new Defi: ${defiDetails.name}`,
      attachments: [
        {
          filename: "DefiAttachment.pdf",
          path: "./path/to/defi/attachment.pdf",
        },
      ],
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error("Send Mail Error:", error);
        res.status(500).json({ error: "Erreur lors de l'envoi de l'email" });
      } else {
        res.json({ message: "Notification envoyée avec succès" });
      }
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi de la notification :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
}

async function gradeTeamWork(req, res) {
  const { teamId, defiId, grades, criteriaCoefficients } = req.body;
  try {
    const evaluationResult = await evaluationService.gradeTeamWork(
      teamId,
      defiId,
      grades,
      criteriaCoefficients
    );
    res.json(evaluationResult);
  } catch (error) {
    console.error("Erreur lors de l'évaluation :", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
}

module.exports = {
  sendNotificationWithEmail,
  gradeTeamWork,
};
