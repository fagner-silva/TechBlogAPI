const Post = require('../../src/models/post.model.js');
const {
    getAllPosts,
    createPost,
    updatePost,
    deletePost,
} = require('../../src/services/post.service');

jest.mock('../../src/models/post.model');

beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
});

afterAll(() => {
    console.error.mockRestore();
});

describe('Post Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllPosts', () => {
        it('deve retornar uma lista de posts', async () => {
            const mockPosts = [{ titulo: 'Post 1' }, { titulo: 'Post 2' }];

            Post.find.mockReturnValue({ sort: jest.fn().mockResolvedValue(mockPosts) });

            const result = await getAllPosts();

            expect(Post.find).toHaveBeenCalled();
            expect(result).toEqual(mockPosts);
        });
    });

    describe('PostService - createPost', () => {
        it('deve criar um novo post com sucesso', async () => {
            const dadosMock = {
                titulo: 'Novo Post',
                conteudo: 'Conteúdo do post',
                autor: 'Fagner',
            };

            const postCriadoMock = {
                _id: 'abc123',
                ...dadosMock,
                status: 'ativo',
                criadoEm: new Date(),
                atualizadoEm: new Date(),
            };

            Post.create.mockResolvedValue(postCriadoMock);

            const resultado = await createPost(dadosMock);

            expect(Post.create).toHaveBeenCalledWith(dadosMock);
            expect(resultado).toHaveProperty('_id', 'abc123');
            expect(resultado.titulo).toBe('Novo Post');
        });

        it('deve lançar erro ao tentar criar post', async () => {
            const dadosMock = { titulo: 'Erro', conteudo: '...', autor: 'Erro' };
            Post.create.mockRejectedValue(new Error('Erro de banco'));

            await expect(createPost(dadosMock)).rejects.toThrow('Erro de banco');
        });
    });

    describe('PostService - updatePost', () => {
        it('deve atualizar um post com sucesso', async () => {
            const id = '507f191e810c19729de860ea';
            const dadosAtualizados = { titulo: 'Atualizado', conteudo: 'Novo conteúdo' };

            const mockAtualizado = {
                _id: id,
                ...dadosAtualizados,
                atualizadoEm: new Date(),
            };

            Post.findByIdAndUpdate.mockResolvedValue(mockAtualizado);

            const resultado = await updatePost(id, dadosAtualizados);

            expect(Post.findByIdAndUpdate).toHaveBeenCalled();
            expect(resultado).toHaveProperty('titulo', 'Atualizado');
        });

        it('deve lançar erro ao tentar atualizar', async () => {
            const id = '507f191e810c19729de860ea';
            Post.findByIdAndUpdate.mockRejectedValue(new Error('Erro no update'));

            await expect(updatePost(id, {})).rejects.toThrow('Erro no update');
        });
    });
    describe('PostService - deletePost', () => {
        it('deve deletar um post com sucesso', async () => {
            const id = '507f191e810c19729de860ea';

            const postDeletadoMock = {
                _id: id,
                titulo: 'Post deletado',
                conteudo: 'Conteúdo',
                autor: 'Fagner',
            };

            Post.findByIdAndDelete.mockResolvedValue(postDeletadoMock);

            const resultado = await deletePost(id);

            expect(Post.findByIdAndDelete).toHaveBeenCalledWith(expect.any(Object));
            expect(resultado).toEqual(postDeletadoMock);
        });

        it('deve lançar erro ao tentar deletar post', async () => {
            const id = '507f191e810c19729de860ea';

            Post.findByIdAndDelete.mockRejectedValue(new Error('Erro ao deletar'));

            await expect(deletePost(id)).rejects.toThrow('Erro ao deletar');
        });
    });
});