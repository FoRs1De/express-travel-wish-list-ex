const { Router } = require('express');
const { countriesList } = require('../controllers/homecontroller');
const app = Router();

app.route('/api/countries').get(countriesList).post(countriesList);

module.exports = app;
