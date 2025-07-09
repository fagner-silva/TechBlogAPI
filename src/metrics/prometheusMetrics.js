const client = require('prom-client');

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const httpRequestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total de requisições HTTP',
    labelNames: ['method', 'route', 'status'],
});

function contarRequisicao(req, res, next) {
    res.on('finish', () => {
      httpRequestCounter.labels(req.method, req.path, res.statusCode).inc();
    });
    next();
}

module.exports = {
    contarRequisicao,
    metricsRegistry: client.register
};