const express = require('express');
const app = express();

const movieRoutes = require('./routes/movies');
const errorHandler = require('./middleware/errorHandler');

app.use('/movies', movieRoutes);
app.use(errorHandler);

module.exports = app;
