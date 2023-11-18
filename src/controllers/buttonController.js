const mqtt = require('../models/connectMqtt')
const buttonOption =  async (request, response) => {
    const option = request.params.value
    mqtt.serverMqtt(option)
    return response.status(200).json({ value: option})
}

module.exports = {buttonOption}