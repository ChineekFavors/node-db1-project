const express = require('express');

const db = require('./data/dbConfig.js');
const accountsRouter = require('./data/seeds/accountsRouter.js');

const server = express();

server.use(express.json());

 server.use('/accounts', accountsRouter);

server.get('/', (req,res) => {
    res.status(200).send('<h1>Get Ready to Rock and Roll</h2>');
});

module.exports = server;