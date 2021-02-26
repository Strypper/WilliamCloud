//EXPRESS
const devices = require('./Routes/Device');
const express = require('express');
const app = express();
const expressPort = 3000;


//MQTT
const aedes = require('aedes')();
const server = require('net').createServer(aedes.handle);
const mqttPort = 1883;

//MONGOOSE
const mongoose = require('mongoose');
const { stringify } = require('querystring');

mongoose.connect('mongodb://localhost/William', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        .then(() => console.log('Sucessfully connect to MongoDb'))
        .catch(err => console.log(err));

const deviceSchema = new mongoose.Schema({
    name: String,
    type: String,
    channel: String
});

const CommandCenter = mongoose.model('Device', deviceSchema);

async function createCommandCenter(){
    const commandCenter = new CommandCenter({
        name: 'Command Center',
        type: 'Control Center',
        channel: 'ControlCenterChannel'
    })
    
    const result = await commandCenter.save();
    console.log(result);
}

createCommandCenter();

app.use('/api/devices', devices);
app.listen(expressPort, () => console.log(`Listening on port ${expressPort}`));


server.listen(mqttPort, function () {
    console.log('server started and listening on port ', mqttPort);
})
