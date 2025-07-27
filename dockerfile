# Imagem base
FROM node:20

# Diretório de trabalho
WORKDIR /app

# Copiar os arquivos de dependências
COPY package.json ./

# Instalar dependências
RUN npm install

# Copiar todo o restante do projeto
COPY . .

# Expor a porta da API
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]