const connection = require('./connectionDB')

const getAll = async () =>{
    const [getAll] = await connection.execute('SELECT * FROM cards')

    return getAll
}

const creatCards = async(card) => {
    const {usuario_id, acesso_unico, codigo_qr} = card
    const createdCards = await connection.execute('INSERT INTO cards (usuario_id, acesso_unico, codigo_qr, create_at) VALUES (?,?,?,NOW())',[usuario_id, acesso_unico, codigo_qr])

    return createdCards
}

module.exports = {
    creatCards,
    getAll
}