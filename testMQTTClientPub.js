const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://localhost:1883')
const topic = 'TrashChannel'
const message = 'Hello world from the cloud !'

client.on('connect', () => {
    setInterval(() => {
        client.publish(topic, message)
        console.log('Message sent!', message)
    }, 2000)
})