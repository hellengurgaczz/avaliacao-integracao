const Sequelize = require('Sequelize');

const database = new Sequelize(DATABASE, 'root', '261315', {
    host: 'localhost',
    dialect: 'mysql'
});

database.authenticate().then(() => {
    console.log('Conexão com banco de dados estabelecida');
}).catch((error) => {
    console.log(error)
});

module.exports = database;