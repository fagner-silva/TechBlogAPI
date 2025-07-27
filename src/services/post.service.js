const Post = require('../models/post.model');
const mongoose = require('mongoose');

async function getPostId(id) {
    try {
        const objectId = new mongoose.Types.ObjectId(id);
        const post = await Post.findById(objectId);
        return post;
    }
catch (error) {
        console.error('Erro ao buscar post por ID: ' + error.message);
        throw error;
    }
}

async function getAllPosts() {
    try {
        const posts = await Post.find().sort({ criadoEm: -1 });
        return posts;
    }
    catch (error) {
        console.error('Erro ao buscar posts:' + error.message);
        throw error;
    }
}

async function createPost(dadosPost) {
    try {
        const post = await Post.create(dadosPost);
        return post;
    }
    catch (error) {
        console.error('Erro ao criar post:' + error.message);
        throw error;
    }
}

async function updatePost(id, dadosAtualizados) {
    try {
        const objectId = new mongoose.Types.ObjectId(id);
        const post = await Post.findByIdAndUpdate(
            objectId,
            {
                ...dadosAtualizados,
                atualizadoEm: new Date(),
            },
            { new: true }
        );

        return post;
    } catch (error) {
        console.error('Erro ao atualizar post: ' + error.message);
        throw error;
    }
}

async function deletePost(id) {
    const objectId = new mongoose.Types.ObjectId(id);
    try {
        const post = await Post.findByIdAndDelete(objectId);
        return post;
    }
    catch (error) {
        console.error('Erro ao deletar post:' + error.message);
        throw error;
    }
}

async function inactivatePost(id) {
    try {
        return await Post.findByIdAndUpdate(id, { status: 'inativo' }, { new: true });
    } catch (error) {
        console.error('Erro ao inativar post:', error.message);
        throw error;
    }
}

async function searchPosts(query){
    try{
        const regex = new RegExp(query, 'i');
        const posts = await Post.find({
            $or: [
                { titulo: regex },
                { conteudo: regex }
            ]
        }).sort({ criadoEm: -1 });
        return posts;
    }
    catch (error) {
        console.error('Erro ao buscar posts por consulta: ' + error.message);
        throw error;
    }
}

module.exports = {
    getPostId,
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
    inactivatePost,
    searchPosts
};