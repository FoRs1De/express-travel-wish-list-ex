const { Router } = require('express');
const { country } = require('../controllers/paramsController');
const app = Router();

app.route('/api/countries/:code').get(country).put(country).delete(country);

module.exports = app;
