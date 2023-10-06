const cardModel = require('../models/cardsModels')

const getAll = async (request, response) => {
    const getAll = await cardModel.getAll()

    return response.status(200).json(getAll)
}

const createCard = async (request, response) => {
    const createdCards = await cardModel.creatCards(request.body)
    return response.status(201).json(createdCards)
}

module.exports = {
    createCard,
    getAll
}