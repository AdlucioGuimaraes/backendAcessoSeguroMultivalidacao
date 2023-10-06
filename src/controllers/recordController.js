const cardModel = require('../models/cardsModels')
const getAll = async (request, response) => {

    const users = await cardModel.getAll()
   return response.status(200).json(users)
}

module.exports = {
    getAll
}