const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const AWS = require('aws-sdk');
const config = require('./config');

if (config.env === 'local') AWS.config.dynamodb = { endpoint: 'http://localstack:4569' };

const router = require('./router');
const swaggerDocument = require('./swagger.json');
const app = express();

// Enable cors for public access
app.use(cors());

// Healthcheck
app.get('/health', (req, res) => {
    res.status(200).end();
});

// Serve swagger documentation
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// JSON parsing
app.use(bodyParser.json());

// Other request types parsing
app.use(bodyParser.urlencoded({
    extended: true
}));

// Remove express header
app.use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    next();
});

// API requests routing
app.use('/', router);

module.exports = app;