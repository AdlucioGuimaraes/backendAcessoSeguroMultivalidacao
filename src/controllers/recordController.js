const recordModel = require('../models/recordModels')


const getAll = async (request, response) => {

    const records = await recordModel.getAll()

    if(records === 0) return response.status(404).json({ message: 'Nenhum registro encontrado' });
   return response.status(200).json(records)
}

const deleteRecords = async (request,response) => {
    const {id} = request.params
    await recordModel.deleteRecords(id)
    return response.status(201).json()
}

module.exports = {
    getAll,
    deleteRecords
}