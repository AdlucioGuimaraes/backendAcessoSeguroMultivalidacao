const cardModel = require('../models/cardsModels')

const getAll = async (request, response) => {
    const getAll = await cardModel.getAll()

    return response.status(200).json(getAll)
}

const createCard = async (request, response) => {
    const userid = request.id
    const createdCards = await cardModel.creatCards(request.id,request.body)
    return response.status(201).json(createdCards)
}

const deleteCards = async (request,response) => {
    const {id} = request.params
    await cardModel.deleteCard(id)

    return response.status(201).json()
}

module.exports = {
    createCard,
    getAll,
    deleteCards
}