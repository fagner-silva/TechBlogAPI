# 📰 TechBlog API

## 🌐 Links de Produção

- 🔗 [TechBlogAPI - Produção](https://techblogapi-m8yz.onrender.com)
- 📊 [Prometheus - Monitoramento](https://prometheus-6wsl.onrender.com)
- 📈 [Grafana - Dashboard](https://grafana-i9qg.onrender.com)

---


API RESTful para gerenciamento de postagens em um blog educacional, permitindo que professores criem, editem e excluam posts, e que alunos consultem os conteúdos. Desenvolvido com Node.js, Express e MongoDB.

---

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- MongoDB (com Mongoose)
- JWT (autenticação)
- Swagger (documentação)
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- StrykerJS (testes mutantes)

---

## 📁 Estrutura do Projeto

```
├── src/
│   ├── config/
│   ├── controllers/
│   ├── metrics/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
├── tests/
│   └── services/
├── .github/workflows/
├── Dockerfile
├── docker-compose.yml
├── render.yaml
├── prometheus.yml
├── package.json
├── README.md
└── .env
```

---

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz com o seguinte conteúdo:

```
PORT=3000
MONGO_URI_PROD=mongodb+srv://<user>:<password>@cluster.mongodb.net/techblog
JWT_SECRET=sua_chave_secreta_segura
```

---

## 🐳 Rodando Localmente com Docker

1. **Clone o repositório:**

```bash
git clone https://github.com/fagner-silva/TechBlogAPI.git
cd TechBlogAPI
```

2. **Configure o `.env`:**

Copie o modelo acima e edite com seus dados.

3. **Suba os containers:**

```bash
docker-compose up --build
```

A aplicação estará disponível em: [http://localhost:3000/api](http://localhost:3000/api)

---

## 🧪 Rodando os Testes

### Testes unitários:

```bash
npm test
```

### Testes mutantes com Stryker:

```bash
npx stryker run
```

---

## 📘 Documentação da API (Swagger)

Acesse a documentação interativa em:

```
http://localhost:3000/api-docs
```

---

## 🔐 Autenticação e Perfis

A API utiliza autenticação via **JWT**. Para acessar rotas protegidas, envie o token JWT no header:

```
Authorization: Bearer <seu_token>
```

Tipos de usuários:
- **Professor**: pode criar, editar e deletar posts.
- **Aluno**: pode apenas visualizar posts.

---

## 📊 Observabilidade

O projeto inclui suporte a Prometheus e Grafana para métricas. Para ativar, consulte o arquivo `prometheus.yml` e os serviços no `render.yaml`.

---

## 🔄 CI/CD com GitHub Actions

- **Build** e **Testes** automatizados a cada `push`.
- Implantação no Render via `render.yaml`.

---

## ✅ Endpoints Principais

| Método | Rota              | Descrição                     |
|--------|-------------------|-------------------------------|
| POST   | `/auth/registrar` | Registro de usuários          |
| POST   | `/auth/login`     | Login e geração de token      |
| GET    | `/posts`          | Lista todos os posts          |
| GET    | `/posts/:id`      | Visualiza post por ID         |
| POST   | `/posts`          | Cria novo post (professor)    |
| PUT    | `/posts/:id`      | Atualiza post (professor)     |
| DELETE | `/posts/:id`      | Remove post (professor)       |
| GET    | `/posts/search`   | Busca posts por termo         |

---

## 👨‍💻 Autor

Desenvolvido por **Fagner Silva**  
🔗 [github.com/fagner-silva](https://github.com/fagner-silva)

---

## 📄 Licença

MIT