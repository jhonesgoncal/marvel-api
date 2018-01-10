'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const router = express.Router();
const app = express();

//Conecta ao Banco
mongoose.connect(config.connectionString);

//Carrega os Models
const Comic = require('./models/comic');
const Character = require('./models/character')
//Carrega as Rotas
const indexRoute = require('./routes/index-route');
const comicRoute = require('./routes/comic-route');
const authRoute = require('./routes/authenticate-route');

app.use(bodyParser.json({
    limit: '5mb'
}));

app.use(bodyParser.urlencoded({ 
    extended: false
}));

//Habilita CORS
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-Token');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, POST, OPTIONS');
    next();
})

app.use('/', indexRoute);
app.use('/comics', comicRoute);
app.use('/authenticate', authRoute);

module.exports = app;