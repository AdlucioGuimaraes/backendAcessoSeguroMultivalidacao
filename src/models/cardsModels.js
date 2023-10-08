const connection = require('./connectionDB')

const getAll = async () =>{
    try {
        const [getAll] = await connection.execute('SELECT * FROM cards');
        
        if (getAll.length === 0) {
            return { message: 'Nenhum card encontrado' };
        }
        
        return getAll;
    } catch (error) {
        console.error(error);
        return { error: 'Erro ao buscar registros' };
    }
}

const creatCards = async(card) => {
    const {usuario_id, acesso_unico, codigo_qr} = card
    const [createdCards] = await connection.execute('INSERT INTO cards (usuario_id, acesso_unico, codigo_qr, create_at) VALUES (?,?,?,NOW())',[usuario_id, acesso_unico, codigo_qr])

    return createdCards
}

const deleteCard = async (id) => {
    const deletedCard = await connection.execute('DELETE FROM cards WHERE id = ?',[id])
    return deletedCard
}

module.exports = {
    creatCards,
    getAll,
    deleteCard
}