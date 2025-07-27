# TechBlog - Plataforma de Postagens para Professores

## 🧠 Descrição do Problema

Atualmente, muitos professores da rede pública não têm acesso a plataformas modernas para compartilhar conteúdo de forma organizada e centralizada. Este projeto visa oferecer uma solução simples e escalável para publicação de aulas e materiais didáticos.

---

## 🗂️ Diagrama de Arquitetura

![Fluxograma](https://i.ibb.co/8gyZtsLy/fluxograma.png)

**Descrição:**
- O usuário faz uma requisição para a API (via front ou Swagger).
- A API em Node.js processa a requisição e acessa o banco MongoDB.
- Métricas da API são expostas no endpoint `/metrics` e monitoradas via Prometheus e Grafana.
- O código é versionado no GitHub com CI/CD automático via GitHub Actions e deploy no Render.

---

## 🔁 Fluxo de Uso

1. Aluno acessa `/posts/all` para ver posts ativos.
2. Professor (autenticado) acessa `/posts` para ver todos os posts.
3. Professores podem criar, editar, deletar e inativar posts.
4. Qualquer usuário pode buscar posts por palavra-chave.

---

## 🔧 Tecnologias

- Node.js
- MongoDB
- Docker
- GitHub Actions (CI/CD)
- Render (Deploy)
- Prometheus + Grafana (Observabilidade)

---

## 🚀 Rotas da API

### ✅ Públicas

| Método | Rota                   | Descrição                           |
|--------|------------------------|--------------------------------------|
| GET    | `/posts/all`           | Listar posts ativos (alunos)         |
| GET    | `/posts/search?termo=` | Buscar por termo no título/conteúdo |
| GET    | `/posts/:id`           | Buscar post por ID                   |

### 🔒 Protegidas (requer token)

| Método | Rota                    | Descrição                     |
|--------|-------------------------|-------------------------------|
| GET    | `/posts`                | Listar todos os posts         |
| POST   | `/posts`                | Criar um post                 |
| PUT    | `/posts/:id`            | Atualizar post                |
| DELETE | `/posts/:id`            | Deletar post                  |
| PUT    | `/posts/:id/inativar`   | Inativar post                 |

---

## 📘 Swagger (Produção)

Acesse a documentação da API aqui:  
[https://techblogapi-m8yz.onrender.com/api-docs](https://techblogapi-m8yz.onrender.com/api-docs)

---

## ⚙️ CI/CD

- Todos os commits na `master` disparam a pipeline.
- A pipeline executa:
  - Testes unitários com Jest
  - Testes mutantes com Stryker
  - Validação da cobertura de testes
  - Build e teste com Docker
  - Deploy automático no Render

---

## 📈 Observabilidade com Grafana + Prometheus

A aplicação expõe métricas em `/metrics`.  
Essas métricas são monitoradas com Prometheus e visualizadas no Grafana.

Exemplo de métrica personalizada:

```txt
http_requests_total{method="GET", route="/posts/search", status="200"} 1
```

---

## 🧪 Experiências e Desafios

- Para garantir cobertura mínima de testes, configuramos validação automática na pipeline.
- Docker nos permitiu validar se a API estava de pé antes de subir ao ambiente.
- Encontramos dificuldades no Render para garantir que as métricas fossem expostas corretamente.
- O Swagger nos ajudou a validar todos os fluxos da aplicação.

---

## 🤝 Integrantes

- Fagner da Silva Gonçalves
