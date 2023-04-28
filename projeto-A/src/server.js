const express = require('express');
const bodyParser = require('body-parser');
const folhaPagamentoController = require('./controllers/folhaPagamentoController');

const server = express();

server.use(express.json());

server.listen(3000, () => {
    console.log("Aplicação rodando na porta 3000");
})

server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

server.post("/folha/cadastrar", async (req, res) => {
    try {
        const response = await folhaPagamentoController.cadastrar(req)
        res.status(200).send({
            message: 'Folha de pagamento cadastrado com sucesso.',
            data: response
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }}
);


server.get('/folha/calcular', async (_, res) => {
    try {
        response = await folhaPagamentoController.calcular()
        res.send(response)
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
});

server.get('/folha/listar', async (_, res) => {
    try {
        response = await folhaPagamentoController.listar()
        res.status(200).send({
            data: response
        });
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
});