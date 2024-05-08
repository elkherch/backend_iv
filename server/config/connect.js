const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connexion à la base de données MongoDB réussie');
  } catch (error) {
    console.error('Erreur de connexion à la base de données MongoDB :', error);
    throw error;
  }
}

module.exports = connectToDatabase;
