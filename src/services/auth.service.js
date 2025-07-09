require('dotenv').config();
const User = require('../models/user.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const SALT_ROUNDS = 10;

const SECRET = process.env.JWT_SECRET

async function registrarUsuario({ nome, email, senha, perfil }) {
    try {
        const senhaCriptografada = await bcrypt.hash(senha, SALT_ROUNDS);
        const novoUsuario = await User.create({ nome, email, senha: senhaCriptografada, perfil });
        return novoUsuario;
    } catch (error) {
        console.error('Erro ao registrar usuário:', error.message);
        throw error;
    }
}

async function autenticarUsuario(email, senha) {
    try {
        const usuario = await User.findOne({ email });
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            throw new Error('Senha inválida');
        }
        const token = jwt.sign({ id: usuario._id, perfil: usuario.perfil, email: usuario.email }, SECRET, { expiresIn: '1h' });

        return { token };
    } catch (error) {
        console.error('Erro ao autenticar usuário:', error.message);
        throw error;
    }
}

module.exports = {
    registrarUsuario,
    autenticarUsuario
};