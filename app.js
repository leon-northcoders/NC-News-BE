const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const apiRouter = require('./routes/api')
mongoose.Promise = Promise;
const { DB_URL } = require('./config')

const app = express();

mongoose.connect(`${DB_URL}`)

app.use(bodyParser.json());
// app.use('/api', apiRouter)

module.exports = app;