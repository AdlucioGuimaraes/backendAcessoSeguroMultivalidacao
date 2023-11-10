const connection = require('./connectionDB')
const QRCode = require('qrcode');
const qrCode = require('../middlewares/QrCode')
const record = require('../models/recordModels')
const create_at = new Date();

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
    const {acesso_unico} = card
    let status;
    if(acesso_unico === 1) status = 'Não Utilizado'
    if(acesso_unico === 0) status = 'Irrestrito'
    try{
        const geraQRCode = await qrCode.qrCode(id,create_at)
        const [createdCards] = await connection.execute('INSERT INTO cards (usuario_id, acesso_unico, codigo_qr, status, create_at) VALUES (?,?,?,?,?)',[id, acesso_unico, geraQRCode,status, create_at])
        const id_card = createdCards.insertId
        
        if (createdCards && createdCards.affectedRows === 1) {
            record.createRecords(id_card, id, '')
            return { id: id_card,id_user: id, qr: geraQRCode, message: 'Card Cadastrado com sucesso' };

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

const updateCard = async (id, status) => {
    console.log(status)
    const updateCard = await connection.execute('UPDATE cards SET status = ? WHERE id = ? ',[status,id])

    return updateCard
}

const readQr = async (code) => {
    const [readerQr] = await connection.execute('SELECT * FROM cards WHERE codigo_qr = ?', [code]);
    return readerQr
}

const generateCards = async (id) => {
    const [generateCard]= await connection.execute('SELECT codigo_qr FROM  cards WHERE id = ?',[id])
    const code = generateCard[0].codigo_qr
    return code;
}

module.exports = {
    creatCards,
    getAll,
    deleteCard,
    updateCard,
    readQr,
    generateCards
}