require('dotenv').config()
const serverMqtt = (listening) =>{
    const mqtt = require('mqtt')
    console.log('Testando...', listening)
    const host = process.env.URL_MQTT
    const port = '1883'

    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

    const connectUrl = `mqtt://${host}:${port}`

    const client = mqtt.connect(connectUrl, {
        clientId,
        clean: true,
        connectTimeout: 4000,
        username: '',
        password: '',
        reconnectPeriod: 1000

});

const pubTopic = 'esp32/IoT'
const subTopic = 'message/send'

client.on('connect', () =>{
    console.log('Mqtt Connected!')
    client.subscribe([subTopic], () =>{
        console.log(`Subscribe to topic ${subTopic}`)

    })

    client.publish(pubTopic, listening, {
        qos: 0,
        retain: false
    }, (error) => {
        if(error){
            console.log('Falha ao conectar ao Mqtt')
        }
    })
})

client.on('message', (subTopic, payload) => {
    console.log('Received Message: ',subTopic, payload.toString())
})
}

module.exports = {serverMqtt}