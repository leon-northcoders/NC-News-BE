const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api');
const { DB_URL } = process.env || require('./config');
mongoose.Promise = Promise;

mongoose.connect(DB_URL)
    .then(() => {
        console.log(`connected to  ${DB_URL}`)
    })

app.use(bodyParser.json());
app.use('/api', apiRouter)
app.set('view engine', 'html')
app.use(express.static(__dirname + '/public'))
app.get('/', (req, res, next) => {
    res.render('index');
});

app.use('/*', (req, res, next) => next({ status: 404 }));

app.use((err, req, res, next) => {
    if(err.status === 404) res.status(404).send({ message: '404: Page Not Found.' })
    else next(err);
});

app.use((err, req, res, next) => {
    if(err.status === 400) res.status(400).send({ message: '400: Bad Request.' })
    else next(err);
});

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send({ message: '500: Internal Server Error.'})
})

module.exports = app;