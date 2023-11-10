const userModel = require('../models/userModels')

const validUser = async (request, response) => {
    const email = request.body.email
    const senha = request.body.senha
    console.log(email,senha)
    const userLoged = await userModel.validUser(email,senha)
    return response.status(200).json(userLoged)
};

module.exports = {validUser}