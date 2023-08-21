const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const homeRoute = require('./routes/homeRoute');
const paramsRoute = require('./routes/paramsRoute');
app.use(bodyParser.json());

app.use(homeRoute);
app.use(paramsRoute);
app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
