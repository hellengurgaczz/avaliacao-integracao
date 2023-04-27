const express = require('express');
const router = require('./config/routes');

const server = express();

server.use(express.json());
server.use(router)

server.listen(3000, () => {
    console.log("Aplicação rodando na porta 3000");
})