const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    perfil: { type: String, enum: ['admin', 'professor', 'reitor', 'aluno'], required: true },
    criadoEm: { type: Date, default: Date.now },
},
    {
        timestamps: { createdAt: 'criadoEm', updatedAt: 'atualizadoEm' }
    });
const User = mongoose.model('User', userSchema);

module.exports = User;