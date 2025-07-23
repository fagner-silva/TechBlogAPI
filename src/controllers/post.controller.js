const Post = require('../models/post.model');
const { getPostId, getAllPosts, createPost, deletePost, inactivatePost, updatePost, searchPosts,  } = require('../services/post.service');

async function listarPostPorId(req, res) {
    try {
        const { id } = req.params;
        const post = await getPostId(id);
        if (!post) {
            return res.status(404).json(erros.POST_NAO_ENCONTRADO);
        }
        res.status(200).json(post);
    }
    catch (error) {
        console.error('Erro ao buscar post por ID:', error.message);
        res.status(500).json(erros.POST_ERRO_BUSCAR);
    }
}

async function listarPostsAluno(req, res) {
  try {
    const posts = await Post.find({ status: 'ativo' }).sort({ criadoEm: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json(erros.POST_ERRO_BUSCAR);
  }
}

async function listarPostsProfessor(req, res) {
  try {
    const posts = await Post.find().sort({ criadoEm: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json(erros.POST_ERRO_BUSCAR);
  }
}

async function criarPost(req, res) {
    try {
        const dados = req.body;
        const novoPost = await createPost(dados);
        res.status(201).json(novoPost);
    } catch (error) {
        console.error('Erro ao criar post:', error.message);
        res.status(500).json(erros.POST_ERRO_CRIAR);
    }
}

async function atualizarPost(req, res) {
    try {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        const postAtualizado = await updatePost(id, dadosAtualizados);
        if (!postAtualizado) {
            return res.status(404).json(erros.POST_NAO_ENCONTRADO);
        }
        res.status(200).json(postAtualizado);
    }
    catch (error) {
        console.error('Erro ao atualizar post:', error.message);
        res.status(500).json(erros.POST_ERRO_ATUALIZAR);
    }
}

async function deletarPost(req, res) {
    try {
        const { id } = req.params;
        const postDeletado = await deletePost(id);
        if (!postDeletado) {
            return res.status(404).json({ message: 'Post não encontrado' });
        }
        res.status(200).json({ message: 'Post deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar post:', error.message);
        res.status(500).json(erros.POST_ERRO_DELETAR);
    }
}

async function inativarPost(req, res) {
    try {
        const { id } = req.params;
        const post = await inactivatePost(id);
        if (!post) {
            return res.status(404).json({ message: 'Post não encontrado' });
        }
        res.status(200).json({ message: 'Post inativado com sucesso' });
    } catch (error) {
        console.error('Erro ao inativar post:', error.message);
        res.status(500).json({ message: 'Erro ao inativar post' });
    }
}

async function buscarPosts(req, res) {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: 'Query de busca é obrigatória' });
        }
        const posts = await searchPosts(query);
        res.status(200).json(posts);
    }
    catch (error) {
        console.error('Erro ao buscar posts:', error.message);
        res.status(500).json(erros.POST_ERRO_BUSCAR_QUERY);
    }
}

module.exports = {
    listarPostsAluno,
    listarPostsProfessor,
    criarPost,
    atualizarPost,
    deletarPost,
    inativarPost,
    buscarPosts,
    listarPostPorId
};