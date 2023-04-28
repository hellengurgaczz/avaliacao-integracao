const express = require('express');
const bodyParser = require('body-parser');
const folhaPagamentoController = require('./controllers/folhaPagamentoController');

const server = express();

server.use(express.json());

server.listen(3001, () => {
    console.log("Aplicação rodando na porta 3001");
})

server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

server.get('/folha/listar', async (req, res) => {
    try {
        const response = await folhaPagamentoController.listar()
        res.status(200).send({
            data: response
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
});