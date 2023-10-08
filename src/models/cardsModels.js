const connection = require('./connectionDB')
const bcrypt = require('bcrypt');

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

const creatCards = async(id,card) => {
    const {acesso_unico, codigo_qr} = card

    try{
        const [createdCards] = await connection.execute('INSERT INTO cards (usuario_id, acesso_unico, codigo_qr, create_at) VALUES (?,?,?,NOW())',[id, acesso_unico, codigo_qr])

        if (createdCards && createdCards.affectedRows === 1) {
            return { message: 'Cadastrado com sucesso' };
        } else {
            return { message: 'Erro ao cadastrar usuário' };
        }

    }catch(error) {
        console.error('Erro ao criar Card:', error);
        throw error; 
    }
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