const { registrarUsuario,autenticarUsuario } = require('../services/auth.service');
const erros = require('../utils/errors');

const { listarUsuarios } = require('../services/auth.service');
const { atualizarUsuario } = require('../services/auth.service');

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

async function listar(req, res) {
    try {
        const perfilFiltro = req.query.perfil;
        if (perfilFiltro && !['professor', 'aluno'].includes(perfilFiltro)) {
            return res.status(400).json({ code: 'ERROR_PARAM', message: 'Perfil inválido para filtro' });
        }
        const usuarios = await listarUsuarios({ perfil: perfilFiltro });
        return res.status(200).json(usuarios);
    } catch (error) {
        console.error('Erro ao listar usuários:', error.message);
        return res.status(500).json(erros.ERRO_INTERNO);
    }
}

module.exports.listar = listar;

async function atualizar(req, res) {
    try {
        const { id } = req.params;
        const { nome, email, senha, perfil } = req.body;

        // Perfil não pode ser alterado
        if (perfil) {
            return res.status(400).json({ code: 'ERROR_PARAM', message: 'O perfil não pode ser alterado através desta rota' });
        }

        if (!nome && !email && !senha) {
            return res.status(400).json({ code: 'ERROR_PARAM', message: 'Ao menos um dos campos nome, email ou senha deve ser fornecido' });
        }

        const usuarioAtualizado = await atualizarUsuario(id, { nome, email, senha });
        if (!usuarioAtualizado) return res.status(404).json({ code: 'ERROR_NOT_FOUND', message: 'Usuário não encontrado' });
        return res.status(200).json(usuarioAtualizado);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json(require('../utils/errors').EMAIL_DUPLICADO);
        }
        console.error('Erro ao atualizar usuário:', error.message);
        return res.status(500).json(erros.ERRO_INTERNO);
    }
}

module.exports.atualizar = atualizar;