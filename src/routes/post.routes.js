const express = require('express');
const router = express.Router();
const {
  listarPostPorId,
  listarPostsAluno,
  listarPostsProfessor,
  criarPost,
  atualizarPost,
  deletarPost,
  buscarPosts,
  inativarPost
} = require('../controllers/post.controller');
const autenticarToken = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   - name: Aluno
 *     description: Acesso público a posts ativos
 *   - name: Professor
 *     description: Gerenciamento de postagens (requer autenticação)
 */

//
// ROTAS ALUNO
//

/**
 * @swagger
 * /posts/all:
 *   get:
 *     summary: Lista todos os posts ativos (Alunos)
 *     tags: [Aluno]
 *     responses:
 *       200:
 *         description: Lista de posts retornada com sucesso
 */
router.get('/posts/all', listarPostsAluno);

/**
 * @swagger
 * /posts/search:
 *   get:
 *     summary: Busca posts pelo termo (Alunos)
 *     tags: [Aluno]
 *     parameters:
 *       - in: query
 *         name: termo
 *         required: true
 *         schema:
 *           type: string
 *         description: Termo de busca (título ou conteúdo)
 *     responses:
 *       200:
 *         description: Lista de posts filtrados
 */
router.get('/posts/search', buscarPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Busca um post pelo ID
 *     tags: [Aluno]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post
 *     responses:
 *       200:
 *         description: Post encontrado
 *       404:
 *         description: Post não encontrado
 */
router.get('/posts/:id', listarPostPorId);

//
// ROTAS PROFESSOR
//

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Lista todos os posts (Professor)
 *     tags: [Professor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de posts retornada com sucesso
 */
router.get('/posts', autenticarToken, listarPostsProfessor);

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Cria um novo post
 *     tags: [Professor]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - conteudo
 *               - autor
 *             properties:
 *               titulo:
 *                 type: string
 *               conteudo:
 *                 type: string
 *               autor:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/posts', autenticarToken, criarPost);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Atualiza um post existente
 *     tags: [Professor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               conteudo:
 *                 type: string
 *               autor:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post atualizado com sucesso
 *       404:
 *         description: Post não encontrado
 */
router.put('/posts/:id', autenticarToken, atualizarPost);

/**
 * @swagger
 * /posts/{id}/inativar:
 *   put:
 *     summary: Inativa um post
 *     tags: [Professor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post a ser inativado
 *     responses:
 *       200:
 *         description: Post inativado com sucesso
 *       404:
 *         description: Post não encontrado
 */
router.put('/posts/:id/inativar', autenticarToken, inativarPost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Deleta um post pelo ID
 *     tags: [Professor]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do post a ser deletado
 *     responses:
 *       200:
 *         description: Post deletado com sucesso
 *       404:
 *         description: Post não encontrado
 */
router.delete('/posts/:id', autenticarToken, deletarPost);

module.exports = router;
