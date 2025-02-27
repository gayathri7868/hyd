const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');

const Route = require('./models/Routes.Model');
const Stop = require('./models/Stops.Model');

mongoose.connect('mongodb://localhost:27017/hyd', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB...');
        importStops();
        importRoutes();
    })
    .catch((error) => console.error('MongoDB connection error:', error));

const stopsCache = {};

const findStop = async (stopName) => {
    if (!stopName) {
        console.error("Error: Stop name is missing.");
        return null;
    }

    if (stopsCache[stopName]) {
        return stopsCache[stopName];
    }

    let stop = await Stop.findOne({ name: stopName });
    if (!stop) {
        stop = new Stop({ name: stopName });
        await stop.save();
    }

    stopsCache[stopName] = stop._id;
    return stop._id;
}


const importStops = async () => {
    console.log('Importing Stops...');
    fs.createReadStream('../sorted_unique.csv')
        .pipe(csv())
        .on('data', async (row) => {
            const { name } = row;
            if (!name) {
                console.error("Error: Missing stop name in row:", row);
                return;
            }

            if (!stopsCache[name]) {
                const stop = new Stop({ name });
                await stop.save();
                stopsCache[name] = stop._id;
            }
        })
        .on('end', () => {
            console.log('Stops import completed.');
        })
        .on('error', (error) => console.error('Error reading Stops file:', error));
}

const importRoutes = async () => {
    console.log('Importing Routes...');
    fs.createReadStream('../data.csv')
        .pipe(csv())
        .on('data', async (row) => {
            const { number, startLocation, endLocation, intermediateStops } = row;
            const startId = await findStop(startLocation);
            const endId = await findStop(endLocation);

            const intermediateStopIds = await Promise.all(
                intermediateStops.replace(/[\[\]']/g, '').split(',')
                    .map(stop => findStop(stop.trim()))
            );

            const newRoute = new Route({
                number,
                startLocation: startId,
                endLocation: endId,
                intermediateStops: intermediateStopIds
            });
            await newRoute.save();
        })
        .on('end', () => {
            console.log('Routes import completed.');
        })
        .on('error', (error) => console.error('Error reading Routes file:', error));
}
