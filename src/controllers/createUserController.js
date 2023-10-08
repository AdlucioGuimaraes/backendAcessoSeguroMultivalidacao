const userModel = require('../models/userModels')

const createCard = async (request, response) => {
    const createdUser = await userModel.creatCards(request.body)
    return response.status(201).json(createdUser)
}


module.exports = {createUser}