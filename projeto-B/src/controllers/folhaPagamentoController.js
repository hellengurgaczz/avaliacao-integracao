const axios = require('axios');

async function listar() {
    try {
        const response = await axios.get(`http://localhost:3000/folha/calcular`)
        return response.data
    } catch(error) {
        throw new Error(error)
    }
}

module.exports = { listar }