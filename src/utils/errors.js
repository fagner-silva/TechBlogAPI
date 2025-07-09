module.exports = {
  // Auth
  EMAIL_DUPLICADO: { code: 'ERROR01', message: 'E-mail já cadastrado.' },
  CAMPOS_OBRIGATORIOS: { code: 'ERROR02', message: 'Todos os campos são obrigatórios.' },
  LOGIN_INVALIDO: { code: 'ERROR03', message: 'Usuário ou senha inválidos.' },
  USUARIO_NAO_ENCONTRADO: { code: 'ERROR04', message: 'Usuário não encontrado.' },
  ERRO_INTERNO: { code: 'ERROR99', message: 'Erro interno no servidor.' },


  // Post
  POST_NAO_ENCONTRADO: { code: 'POST01', message: 'Post não encontrado.' },
  POST_ERRO_BUSCAR: { code: 'POST02', message: 'Erro ao buscar post.' },
  POST_ERRO_LISTAR: { code: 'POST03', message: 'Erro ao buscar posts.' },
  POST_ERRO_CRIAR: { code: 'POST04', message: 'Erro ao criar post.' },
  POST_ERRO_ATUALIZAR: { code: 'POST05', message: 'Erro ao atualizar post.' },
  POST_ERRO_DELETAR: { code: 'POST06', message: 'Erro ao deletar post.' },
  POST_QUERY_OBRIGATORIA: { code: 'POST07', message: 'Query de busca é obrigatória.' },
  POST_ERRO_BUSCAR_QUERY: { code: 'POST08', message: 'Erro ao buscar posts com query.' },

  // Genericos
  ERRO_INTERNO: { code: 'ERROR99', message: 'Erro interno no servidor.' },

  // Token
  TOKEN_NAO_FORNECIDO: { code: 'AUTH01', message: 'Token de autenticação não fornecido' },
  TOKEN_INVALIDO: { code: 'AUTH02', message: 'Token inválido ou expirado' },
};