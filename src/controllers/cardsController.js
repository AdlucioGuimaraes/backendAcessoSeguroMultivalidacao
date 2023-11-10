const cardModel = require('../models/cardsModels')
const businessBuleQr = require('../useCases/qrUseCase')

const getAll = async (request, response) => {
    const getAll = await cardModel.getAll()
    return response.status(200).json(getAll)
}


const createCard = async (request, response) => {
    const userid = request.id
    const createdCards = await cardModel.creatCards(userid,request.body)
    return response.status(201).json(createdCards)
}


const deleteCards = async (request,response) => {
    const {id} = request.params
    await cardModel.deleteCard(id)
    return response.status(201).json()
}

const readQR = async (request, response) => {
    const {code} = request.params
    const readerQr = await cardModel.readQr(code)
    const businessBule = await businessBuleQr.businessBuleQr(readerQr)
    return response.status(200).json(businessBule)
}

const generateCards = async (request, response) => {
    const id = request;
    const generateCard = await cardModel.generateCards(id);
    return generateCard;
}

module.exports = {
    createCard,
    getAll,
    deleteCards,
    readQR,
    generateCards
}