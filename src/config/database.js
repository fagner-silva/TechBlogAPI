const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI_PROD || process.env.MONGO_URI_DOCKER || process.env.MONGO_URI_LOCAL;
async function connectToDatabase() {
    try {
        if (!MONGO_URI) throw new Error("MONGO_URI não definida");
        await mongoose.connect(MONGO_URI);
        console.log('Conectado ao MongoDB com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error);
        process.exit(1);
    }
}

module.exports = connectToDatabase;