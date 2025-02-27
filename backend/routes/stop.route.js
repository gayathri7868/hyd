const express = require('express')
const routes = express.Router()
const stopModel = require('../models/Stops.Model');

routes.get('/name/:name', async (req, res) => {
    const name = req.params.name
    try {
        const stop = await stopModel.findOne({ name: name });
        if (!stop) {
            res.status(404).json({ message: "Stop not found" })
        }
        else {
            res.json(stop)
        }

    }
    catch (err) {
        res.status(500).json(`Internal Server error`)
    }
})

routes.get('/id/:id', async (req, res) => {
    const id = req.params.id
    try {
        const placeDoc = await stopModel.findOne({ _id: id });

        if (!placeDoc) {
            return res.status(404).send({ error: 'Place not found' });
        }

        return res.send({ "name": placeDoc.name })
    } catch (error) {
        console.error('Error fetching routes:', error);
        res.status(500).send({ error: 'Server error' });
    }
});


module.exports = routes