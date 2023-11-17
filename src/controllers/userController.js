const userModel = require('../models/userModels')
const createUserModel = require('../models/createUserModel')
const cardModel = require('../models/userModels')
const record = require('../models/recordModels')
const userUseCase = require('../useCases/useCasesUsers')

const getAll = async (request, response) => {
    const users = await userModel.getAll()
    return response.status(200).json(users)
}

const getVisits = async(request,response)=> {
    const users = await userModel.getAll()
    const records = await record.getAll()
    const data = await userUseCase.dataVisits(users,records)
    return response.status(200).json(data)
}

const createUser = async (request, response) => {
    const createdUsers = await createUserModel.createUsers(request.body)
    return response.status(201).json(createdUsers)
}

const deleteUser = async (request, response) => {
    const {id} = request.params
    await userModel.deleteUser(id)
    return response.status(204).json({message: 'deletado com sucesso!'})
}

const updateUser =  async (request, response) => {
    const {id} = request.params
    await userModel.updateUser(id,request.body)
    return response.status(204).json()
}



module.exports = {
    getAll,
    createUser,
    deleteUser,
    updateUser,
    getVisits
}
