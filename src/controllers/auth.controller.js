const { registrarUsuario,autenticarUsuario } = require('../services/auth.service');
const erros = require('../utils/errors');

async function registrar(req, res) {
    try {
        const { nome, email, senha, perfil } = req.body;
        if (!nome || !email || !senha || !perfil) {
            return res.status(400).json(erros.CAMPOS_OBRIGATORIOS);
        }
        const usuario = await registrarUsuario({ nome, email, senha, perfil });
        const { senha: _, ...usuarioSemSenha } = usuario.toObject();
        return res.status(201).json(usuarioSemSenha);
    }catch (error) {
        if (error.code === 11000) { 
            return res.status(400).json(erros.EMAIL_DUPLICADO);
        }
        res.status(500).json(erros.ERRO_INTERNO);
    }
}
async function autenticar(req, res) {
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).json(erros.CAMPOS_OBRIGATORIOS);
        }
        const { token } = await autenticarUsuario(email, senha);
        return res.status(200).json({ token });
    } catch (error) {
        if (error.message === 'Usuário não encontrado') {
            return res.status(404).json(erros.USUARIO_NAO_ENCONTRADO);
        }
        if (error.message === 'Senha inválida') {
            return res.status(401).json(erros.LOGIN_INVALIDO);
        }
        res.status(500).json(erros.ERRO_INTERNO);
    }
}
module.exports = {
    registrar,
    autenticar
};