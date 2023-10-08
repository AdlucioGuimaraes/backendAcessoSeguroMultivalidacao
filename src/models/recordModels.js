const connection  = require('./connectionDB')

const getAll = async (request, response) => {
    try {
        const [getAll] = await connection.execute('SELECT * FROM registers');
        
        if (getAll.length === 0) {
            return { message: 'Nenhum registro encontrado' };
        }
        
        return getAll;
    } catch (error) {
        console.error(error);
        return { error: 'Erro ao buscar registros' };
    }
}

module.exports = {getAll}
