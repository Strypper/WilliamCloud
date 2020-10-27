var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://localhost:1883')
var topic = 'TrashChannel'
var message = 'Hello world from the cloud !'

client.on('connect', () => {
    setInterval(() => {
        client.publish(topic, message)
        console.log('Message sent!', message)
    }, 2000)
})