const ChallengeServices = require('../services/challengesService');
const fs = require('fs');
const unzipper = require('unzipper');
const multer = require('multer');
const nodemailer = require('nodemailer');

// Set up storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads')
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.pdf')
  }
});
const upload = multer({ storage: storage });


async function createChallenges(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { senderEmail, commenters, ...otherData } = req.body;
  const challengeData = { ...otherData, fileUrl: req.file.path };

  try {
    const challenge = await ChallengeServices.createChallenges(challengeData);
    await sendEmailNotification(challenge, senderEmail, commenters);
    res.status(201).json(challenge);
  } catch (error) {
    console.error('Error creating challenge:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function sendEmailNotification(challenge, fromEmail, commenters) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: fromEmail, // Sender's email specified by the challenge creator
    to: [fromEmail, ...commenters], // Include both the sender and all commenters
    subject: 'New Challenge Submitted',
    text: `A new challenge titled "${challenge.title}" has been submitted.`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
async function getAllChallenges(req, res) {
  try {
    const challenges = await ChallengeServices.getAllChallenges();
    res.json(challenges);
  } catch (error) {
    console.error('Erreur :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}


async function getChallengesById(req, res) {
  const challengesId = req.params.id;
  try {
    const challenge = await ChallengeServices.getChallengesById(challengesId);
    res.json(challenge);
  } catch (error) {
    console.error(`Erreur ${challengesId} :`, error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}
async function updateChallenges(req, res) {
  const challengesId = req.params.id;
  const challengeData = req.body;
  try {
    const challenge = await ChallengeServices.updateChallenges(challengesId, challengeData);
    res.json(challenge);
  } catch (error) {
    console.error(`Erreur ${challengesId} :`, error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}
async function deleteChallenges(req, res) {
  const challengesId = req.params.id;
  try {
    const challenge = await ChallengeServices.deleteChallenges(challengesId);
    res.json(challenge);
  } catch (error) {
    console.error(`Erreur lors de la suppression ${challengesId} :`, error);
    res.status(500).json({ error: 'Erreur interne du serveur'});
  }
}
async function importChallengesFromZip(req, res) {
  try {
    if (!req.files || !req.files.zipFile) {
      return res.status(400).json({ error: 'No zip file uploaded' });
    }

    const zipFile = req.files.zipFile;
    const zipFilePath = `./uploads/${zipFile.name}`;

    await zipFile.mv(zipFilePath);

    const descriptions = await extractDescriptionsFromZip(zipFilePath);

    await ChallengesService.importChallengesFromDescriptions(descriptions);

    fs.unlinkSync(zipFilePath);

    return res.status(200).json({ message: 'Challenges imported successfully' });
  } catch (error) {
    console.error('Error importing challenges:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function extractDescriptionsFromZip(zipFilePath) {
  const descriptions = [];

  await fs.createReadStream(zipFilePath)
    .pipe(unzipper.Parse())
    .on('entry', async entry => {
      const fileName = entry.path;
      if (fileName.endsWith('.txt')) {
        const description = await entry.buffer();
        descriptions.push(description.toString());
      } else {
        entry.autodrain();
      }
    });

  return descriptions;
}
module.exports = {
  getAllChallenges,
  getChallengesById,
  createChallenges,
  updateChallenges,
  deleteChallenges,
  upload,
  importChallengesFromZip     
};
