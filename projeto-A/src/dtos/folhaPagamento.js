const { Sequelize, DataTypes } = require('sequelize');
const database = require('../database/db');
 
const FolhaPagamento = database.define('folha_pagamento', {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true,    
        autoIncrement: true,
        allowNull: false
    },
    mes: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ano: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    horas: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    valor: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    funcionario: {
        type: DataTypes.JSON,
        allowNull: false
    }
})

// cria a tabela no banco de dados
FolhaPagamento.sync()
    .then(() => {
        console.log('Tabela folha de pagamento criada com sucesso!');
    })
    .catch((error) => {
        console.error('Erro ao criar tabela de folha de pagamento:', error);
    });
 
module.exports = FolhaPagamento;