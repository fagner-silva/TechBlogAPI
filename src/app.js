const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const { contarRequisicao, metricsRegistry } = require('./metrics/prometheusMetrics');
const swaggerSpec = require('./config/swagger');
const postRoutes = require('./routes/post.routes');
const authRoutes = require('./routes/auth.routes');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'health ok' });
});
app.use(contarRequisicao);
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', metricsRegistry.contentType);
  res.end(await metricsRegistry.metrics());
});

app.use('/api/auth', authRoutes);
app.use('/api', postRoutes);

module.exports = app;