const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  conteudo: { type: String, required: true },
  autor: { type: String, required: true },
  status: { type: String, enum: ['ativo', 'inativo'], default: 'ativo' },
},
  {
    timestamps: { createdAt: 'criadoEm', updatedAt: 'atualizadoEm' }
  });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;