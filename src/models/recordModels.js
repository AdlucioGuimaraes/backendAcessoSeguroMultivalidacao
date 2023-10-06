const connection  = require('./connectionDB')

const getAll  = async (request, response) => {
    const getAll = await connection.execute('SELECT * FROM registers')

    return getAll
}

module.exports = {getAll}
