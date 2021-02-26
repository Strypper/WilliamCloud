const express = require('express');
const router = express.Router();

const devices = [
    { id: '0', name: 'CC1', channel: 'CommandCenterChannel' },
    { id: '1', name: 'TC1', channel: 'LightChannel' },
    { id: '2', name: 'Light', channel: 'LightChannel' }
]

router.get('/', (req, res) => {
    res.send(devices);
});

router.get('/:id', (req, res) => {
    const device = devices.find(d => d.id === req.params.id);
    if(!device) res.status(404).send('No device found');
    res.send(device);
});

module.exports = router;