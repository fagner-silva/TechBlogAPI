const app = require('./src/app');
const connectToDatabase = require('./src/config/database');

const PORT = process.env.PORT || 3000;

async function startServer() {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });

}

startServer();