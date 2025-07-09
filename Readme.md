Passo 1 - Criar diretorios
    
    mkdir -p src/controllers src/routes src/models src/services src/middlewares src/config src/utils tests

Passo 2 - Criar app.js e index.js

    touch src/app.js
    touch index.js

Passo 3 - Inicializar Projeto e Instalar Dependencias 
    
    npm init -y
    npm install express cors dotenv
    npm install --save-dev jest supertest nodemon eslint
    npm install --save-dev @stryker-mutator/core
    npm install swagger-ui-express swagger-jsdoc
    npm install prom-client
    npm install bcrypt jsonwebtoken

Caso o uso seja DynamoDB
    
    npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb

Caso o uso seja o MongoDB
    
    npm install mongoose

Passo 4 - Ajustar script no package.json
    
    "scripts": {
    "dev": "nodemon index.js",
    "test": "jest",
    "mutant": "stryker run"
    }

Passo 5 - Para rodar o projeto 

    npm run dev

Criação de arquivo de rotas

    touch src/routes/post.model.js

Criar arquivo para conectar ao MongoDB 

    touch src/config/database.js

Comando para rodar MongoDB local

    net start MongoDB

Ou Docker

    docker run --name mongo -p 27017:27017 -d mongo

Comando Docker

    docker-compose up -d

Links uteis

    Acesse sua API: http://localhost:3000/health

    Verifique o Swagger: http://localhost:3000/api-docs

    Prometheus: http://localhost:9090

    Grafana: http://localhost:3001