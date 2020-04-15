const express = require('express');
const app = express();

app.use('/', (req, res, next) => {
  res.send('Everything working fine');
});

module.exports = app;
