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

mongoose.connect('mongodb://localhost/William', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        .then(() => console.log('Sucessfully connect to MongoDb'))
        .catch(err => console.log(err));

const commandCenterSchema = new mongoose.Schema({
    name: String,
    model: String,
    status: Boolean,
    connectedDevices: Number,
    ledStatus: Boolean,
    fanStatus: Boolean,
    type: String,
    channel: String,
});

const tc1Schema = new mongoose.Schema({
    name: String,
    model: String,
    status: Boolean,
    trashCapacity: Number,
    currentCapacity: Number,
    isOpen: Boolean
})

const CommandCenter = mongoose.model('CommandCenters', commandCenterSchema);
const TC1 = mongoose.model('TC1s', tc1Schema);

async function createCommandCenter(){
    const commandCenter = new CommandCenter({
        name: 'Command Center',
        model: 'Raspberry pi 3',
        status: false,
        connectedDevices: 0,
        ledStatus: false,
        fanStatus: false,
        type: 'Control Center',
        channel: 'ControlCenterChannel'
    })
    
    const result = await commandCenter.save();
    console.log(result);
}


async function createTC1(){
    const tc1 = new TC1({
        name: 'Trash Can',
        model: 'TC1',
        status: false,
        trashCapacity: 10,
        currentCapacity: 70
    })
    
    const result = await tc1.save();
    console.log(result);
}


createCommandCenter();
createTC1();


app.use('/api/devices', devices);
app.listen(expressPort, () => console.log(`Listening on port ${expressPort}`));


server.listen(mqttPort, function () {
    console.log('server started and listening on port ', mqttPort);
})
