require('dotenv').config()
const jwt = require('jsonwebtoken');
const erros = require('../utils/errors');

const SECRET = process.env.JWT_SECRET;

function autenticarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json(erros.TOKEN_NAO_FORNECIDO);
    }
    jwt.verify(token, SECRET, (err, usuario) => {
        if (err) {
            return res.status(403).json(erros.TOKEN_INVALIDO);
        }

        req.usuario = usuario;
        next();
    });
}

function autorizarPerfis(...perfisPermitidos) {
    return (req, res, next) => {
        const { usuario } = req;
        if (!usuario || !usuario.perfil || !perfisPermitidos.includes(usuario.perfil)) {
            const erros = require('../utils/errors');
            return res.status(403).json(erros.ACESSO_NEGADO);
        }
        next();
    };
}

module.exports = autenticarToken;
module.exports.autorizarPerfis = autorizarPerfis;