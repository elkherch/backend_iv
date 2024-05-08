const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
  },
});

async function sendEmail(req, res) {
  try {
    const { email, sujet, message } = req.body;
    const mailOptions = {
      from: '22025@supnum.mr',
      to: email,
      subject: sujet,
      text: message,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
        res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'e-mail' });
      } else {
        console.log('E-mail envoyé :', info.response);
        res.json({ success: 'E-mail envoyé avec succès' });
      }
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'e-mail' });
  }
}

module.exports = { sendEmail };
