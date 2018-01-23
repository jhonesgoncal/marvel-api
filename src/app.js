'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const utils = require('./utils');

const router = express.Router();
const app = express();

//Conecta ao Banco
mongoose.connect(config.connectionString);

//Carrega os Models
const Comic = require('./models/comic');
const Character = require('./models/character');
const Creator = require('./models/creator');
const Storie = require('./models/storie');

//Carrega as Rotas
const indexRoute = require('./routes/index-route');
const comicRoute = require('./routes/comic-route');
const characterRoute = require('./routes/character-route');
const creatorRoute = require('./routes/creator-route');
const storieRoute = require('./routes/storie-route');
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
    res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, POST, OPTIONS, PATCH');
    next();
})

app.use('/', indexRoute);
app.use('/comics', comicRoute);
app.use('/characters', characterRoute);
app.use('/creators', creatorRoute);
app.use('/stories', storieRoute);
app.use('/authenticate', authRoute);

module.exports = app;