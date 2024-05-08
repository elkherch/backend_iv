const xlsx = require('xlsx');
const fs = require('fs');
const User = require('../model/UserModels')

function readExcelFile(filePath) {
     const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(sheet);
}

async function importUsersFromExcel(filePath) {
    try {
        const userData = readExcelFile(filePath);
        await User.bulkCreate(userData);
        console.log('Données importées avec succès dans la table utilisateur.');
    } catch (error) {
        console.error('Erreur lors de l\'importation des données :', error);
    }
}


module.exports = { importUsersFromExcel };