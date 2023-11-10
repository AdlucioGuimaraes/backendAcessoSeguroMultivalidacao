const connectMqtt = require('../models/connectMqtt')
const cardModel = require('../models/cardsModels')
const records = require('../models/recordModels')
const newData_entrada = new Date()

const businessBuleQr = async ([request], response) =>{
    const id = request.id
    const user_id = request.usuario_id
    const acesso_unico = request.acesso_unico
    const status = request.status
    if (acesso_unico === 1) return verifyUniqueAccess(id,user_id,status)
    if (acesso_unico === 0) return verifyUnrestrictedAccess(id,user_id, status);
    else{
        
    }
}

const verifyUniqueAccess = (id,user_id,status) => {
    if(status === 'Não Utilizado') {
        connectMqtt.serverMqtt('open')
        cardModel.updateCard(id,'Utilizado')
        records.updateRecords(id, user_id, newData_entrada)
        console.log('Porta(Cancela) Aberta')
        return { message: 'Porta(Cancela) Aberta' }
    }
    if(status === 'Utilizado'){
        connectMqtt.serverMqtt('Acesso Negado!')
        console.log('Acesso Bloqueado: Acesso Único Já Utilizado!')
        return { message: 'Acesso Bloqueado: Acesso Único Já Utilizado!'}
    }
}

const verifyUnrestrictedAccess = (id,user_id,status) => {
    if(status === 'Irrestrito') {
        cardModel.updateCard(id,'Irrestrito-Utilizado')
        records.updateRecords(id, user_id)
    }
    if(status === 'Irrestrito-Utilizado') records.createRecords(id, user_id, newData_entrada)
    connectMqtt.serverMqtt('open')
    console.log('Porta(Cancela) Aberta')
    return { message: 'Porta(Cancela) Aberta' }

}
module.exports = {businessBuleQr}