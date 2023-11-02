const connectMqtt = require('../models/connectMqtt')
const cardModel = require('../models/cardsModels')
const records = require('../models/recordModels')

const businessBuleQr = async ([request], response) =>{
    const id = request.id
    const user_id = request.usuario_id
    const acesso_unico = request.acesso_unico
    const status = request.status
    if (acesso_unico === 1) {
        return verifyAcess(id,user_id,status)
    }else{
        records.updateRecords(id, user_id)
        connectMqtt.serverMqtt('open')

        console.log('Porta(Cancela) Aberta')
        return { message: 'Porta(Cancela) Aberta' }
    }
}

const verifyAcess = (id,user_id,status) => {
    if(status === 'Não Utilizado') {
        connectMqtt.serverMqtt('open')
        cardModel.updateCard(id)
        records.updateRecords(id, user_id)
        console.log('Porta(Cancela) Aberta')
        return { message: 'Porta(Cancela) Aberta' }
    }
    if(status === 'Utilizado'){
        console.log('Acesso Bloqueado: Acesso Único Já Utilizado!')
        return { message: 'Acesso Bloqueado: Acesso Único Já Utilizado!'}
    }
}


module.exports = {businessBuleQr}