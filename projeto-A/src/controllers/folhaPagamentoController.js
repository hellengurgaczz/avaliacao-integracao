const { response } = require('express');
const folhaPagamentoRepository = require('../repository/folhaPagamentoRepository');
const axios = require('axios')

async function cadastrar(req) {
    const {mes, ano, horas, valor, nome_funcionario, cpf_funcionario} = req.body;

    const funcionario = {
        nome_funcionario,
        cpf_funcionario
    }

    const response = await folhaPagamentoRepository.cadastrar(mes, ano, horas, valor, JSON.stringify(funcionario, null, 2))
    return response;
}

async function calcular() {
    const folhasDePagamento = await folhaPagamentoRepository.get()

    function CalculoFolhaPagamento(mes, ano, horas, valor, nome_funcionario, cpf_funcionario, salarioBruto, irrf, inss, fgts, salarioLiquido) {
        this.mes = mes;
        this.ano = ano;
        this.horas = horas;
        this.valor = valor;
        this.nome_funcionario = nome_funcionario;
        this.cpf_funcionario = cpf_funcionario;
        this.salarioBruto = salarioBruto;
        this.irrf = irrf;
        this.inss = inss;
        this.fgts = fgts;
        this.salarioLiquido = salarioLiquido;
      }

    const valorImposto = (salarioBruto) => {
        if(salarioBruto < 1904.98) {
            return salarioBruto
        } else if(salarioBruto < 2826.66) {
            return ((salarioBruto * 7.5)/100) - 142.80
        } else if(salarioBruto < 3751.06) {
            return ((salarioBruto * 15)/100) - 354.80
        } else if (salarioBruto < 4664.69)  {
            return ((salarioBruto * 22.5)/100) - 636.13
        } else {
            return ((salarioBruto * 27.5)/100) - 869.36
        }
    }

    const valorINSS = (salarioBruto) => {
        if(salarioBruto < 1693.73) {
            return salarioBruto * (8/100)
        } else if(salarioBruto < 2822.91) {
            return salarioBruto * (9/100)
        } else if(salarioBruto < 5645.81) {
            return salarioBruto * (11/100)
        } else {
            return 621.03
        }
    }

    folhasCalculadas = folhasDePagamento.map(folha => {
        const funcionario = JSON.parse(folha.funcionario)
        const salarioBruto = folha.horas * folha.valor;
        const irrf = valorImposto(salarioBruto);
        const inss = valorINSS(salarioBruto)
        const fgts = salarioBruto * (8/100)
        const salarioLiquido = salarioBruto - irrf - inss
        return new CalculoFolhaPagamento(folha.mes, folha.ano, folha.horas, folha.valor, funcionario.nome_funcionario, funcionario.cpf_funcionario, salarioBruto, irrf, inss, fgts, salarioLiquido )
    })


    return folhasCalculadas

}

async function listar() {
    const response = await axios.get(`http://localhost:3001/folha/listar`)
    return response.data
}

module.exports = { cadastrar, calcular, listar }