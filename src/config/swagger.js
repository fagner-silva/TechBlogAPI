const SwaggerJSDoc = require('swagger-jsdoc');
const isProd = process.env.NODE_ENV === 'production';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'TechBlog API',
            version: '1.0.0',
            description: 'API para gerenciamento de postagens no blog',
        },
        servers: [
            {
                url: isProd
                    ? 'https://techblogapi-m8yz.onrender.com/api'
                    : 'http://localhost:3000/api',
                description: isProd ? 'Produção' : 'Desenvolvimento',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.js', './src/controllers/*.js'],
};

const swaggerSpec = SwaggerJSDoc(options);

module.exports = swaggerSpec;