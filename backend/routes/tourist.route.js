const express = require('express');
const routes = express.Router();
const touristModel = require('../models/Tourist.Model');


routes.get('/', async (req, res) => {
    try {
        const places = await touristModel.find();
        res.status(200).json(places);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tourist places', error: err });
    }
});

routes.get('/:id', async (req, res) => {
    try {
        const place = await touristModel.findById(req.params.id);
        if (!place) return res.status(404).json({ message: 'Place not found' });
        res.status(200).json(place);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching the place', error: err });
    }
});

routes.get('/category/:category', async (req, res) => {
    try {
        const places = await touristModel.find({ category: req.params.category });
        res.status(200).json(places);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching places by category', error: err });
    }
});

routes.get('/name/:name', async (req, res) => {
    try {
        const place = await touristModel.findOne({ name: req.params.name });
        if (!place) return res.status(404).json({ message: 'Place not found' });
        res.status(200).json(place);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching the place', error: err });
    }
});

module.exports = routes;
