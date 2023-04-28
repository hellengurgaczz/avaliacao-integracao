const FolhaPagamento = require('../dtos/folhaPagamento');

async function cadastrar(mes, ano, horas, valor, funcionario) {
    try {
        const folhaPagamento = await FolhaPagamento.create({
            mes,
            ano,
            horas,
            valor,
            funcionario
        });

        return folhaPagamento;
    } catch ( error ) {
        throw new Error('Falha ao cadastrar folha de pagamento')
    }
}

async function get() {
    try {
        const folhasDePagamento = await FolhaPagamento.findAll();
        return folhasDePagamento;
    } catch (error) {
        throw new Error('Falha ao buscar folhas de pagamento.')
    }
}

module.exports = { cadastrar, get }