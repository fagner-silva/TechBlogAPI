const express = require('express');
const router = express.Router();
const { registrar, autenticar, listar } = require('../controllers/auth.controller');
const autenticarToken = require('../middlewares/authMiddleware');
const { autorizarPerfis } = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Registro e login de usuários
 */

/**
 * @swagger
 * /auth/registrar:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *               - perfil
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               perfil:
 *                 type: string
 *                 enum: [admin, professor, reitor, aluno]
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Dados inválidos ou email duplicado
 *       500:
 *         description: Erro interno
 */
router.post('/registrar', registrar);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica um usuário e retorna um token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token JWT gerado com sucesso
 *       400:
 *         description: Campos obrigatórios ausentes
 *       401:
 *         description: Senha inválida
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno
 */
router.post('/login', autenticar);

/**
 * @swagger
 * /auth/users:
 *   get:
 *     summary: Lista todos os usuários (Admin/Professor/Reitor)
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: perfil
 *         schema:
 *           type: string
 *           enum: [professor, aluno]
 *         description: Filtra por perfil (opcional)
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 *       400:
 *         description: Parâmetro inválido
 *       403:
 *         description: Acesso negado
 */
router.get('/users', autenticarToken, autorizarPerfis('admin', 'professor', 'reitor'), listar);

module.exports = router;
