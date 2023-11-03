const connection  = require('./connectionDB')
const data_entrada = ""
const create_at = new Date();


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

const createRecords = async (id,user_id) => {
    const createRecord = await connection.execute("INSERT INTO registers(card_id, usuario_id, data_entrada, adicional1,adicional2, adicional3, created_at) VALUES (?,?,?,?,?,?,?)", [id,user_id,data_entrada,'teste', '', '', create_at])

    return createRecord
}

const updateRecords = async(id, user_id) =>{
    const newData_entrada = new Date()
    const updateRecord = await connection.execute("UPDATE registers SET data_entrada = ? WHERE card_id = ? AND usuario_id = ?", [newData_entrada,id, user_id])

    return updateRecord
}


module.exports = {
    getAll,
    createRecords,
    updateRecords
}
