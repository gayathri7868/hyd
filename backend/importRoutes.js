// // const fs = require('fs');
// // const csv = require('csv-parser');
// // const mongoose = require('mongoose');

// // const Route = require('./models/Routes.Model');
// // const Stop = require('./models/Stops.Model');

// // mongoose.connect('mongodb://localhost:27017/hyd', { useNewUrlParser: true, useUnifiedTopology: true })
// //     .then(() => {
// //         console.log('Connected to MongoDB...');
// //         importStops();
// //         importRoutes();
// //     })
// //     .catch((error) => console.error('MongoDB connection error:', error));

// // const stopsCache = {};

// // const findStop = async (stopName) => {
// //     if (!stopName) {
// //         console.error("Error: Stop name is missing.");
// //         return null;
// //     }

// //     if (stopsCache[stopName]) {
// //         return stopsCache[stopName];
// //     }

// //     let stop = await Stop.findOne({ name: stopName });
// //     if (!stop) {
// //         stop = new Stop({ name: stopName });
// //         await stop.save();
// //     }

// //     stopsCache[stopName] = stop._id;
// //     return stop._id;
// // }


// // const importStops = async () => {
// //     console.log('Importing Stops...');
// //     fs.createReadStream('../sorted_unique.csv')
// //         .pipe(csv())
// //         .on('data', async (row) => {
// //             const { name } = row;
// //             if (!name) {
// //                 console.error("Error: Missing stop name in row:", row);
// //                 return;
// //             }

// //             if (!stopsCache[name]) {
// //                 const stop = new Stop({ name });
// //                 await stop.save();
// //                 stopsCache[name] = stop._id;
// //             }
// //         })
// //         .on('end', () => {
// //             console.log('Stops import completed.');
// //         })
// //         .on('error', (error) => console.error('Error reading Stops file:', error));
// // }

// // const importRoutes = async () => {
// //     console.log('Importing Routes...');
// //     fs.createReadStream('../data.csv')
// //         .pipe(csv())
// //         .on('data', async (row) => {
// //             const { number, startLocation, endLocation, intermediateStops } = row;
// //             const startId = await findStop(startLocation);
// //             const endId = await findStop(endLocation);

// //             const intermediateStopIds = await Promise.all(
// //                 intermediateStops.replace(/[\[\]']/g, '').split(',')
// //                     .map(stop => findStop(stop.trim()))
// //             );

// //             const newRoute = new Route({
// //                 number,
// //                 startLocation: startId,
// //                 endLocation: endId,
// //                 intermediateStops: intermediateStopIds
// //             });
// //             await newRoute.save();
// //         })
// //         .on('end', () => {
// //             console.log('Routes import completed.');
// //         })
// //         .on('error', (error) => console.error('Error reading Routes file:', error));
// // }

// const fs = require('fs');
// const csv = require('csv-parser');
// const { parse } = require('json2csv');
// const mongoose = require('mongoose');

// require('dotenv').config(); 
// const Route = require('./models/Routes.Model');
// const Stop = require('./models/Stops.Model');
// const TouristPlace = require('./models/Tourist.Model');

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('Connected to MongoDB...');
//         importStops();
//         importRoutes();
//     })
//     .catch((error) => console.error('MongoDB connection error:', error));

// const stopsCache = {};

// const findStop = async (stopName) => {
//     if (!stopName) {
//         console.error("Error: Stop name is missing.");
//         return null;
//     }

//     if (stopsCache[stopName]) {
//         return stopsCache[stopName];
//     }

//     let stop = await Stop.findOne({ name: stopName });
//     if (!stop) {
//         stop = new Stop({ name: stopName });
//         await stop.save();


//         appendStopToCSV(stopName);
//     }

//     stopsCache[stopName] = stop._id;
//     return stop._id;
// };


// const appendStopToCSV = (stopName) => {
//     const newStop = [{ name: stopName }];
//     const csvData = parse(newStop, { header: false });

//     fs.appendFileSync('../hyd.stops.csv', `\n${csvData}`, 'utf8', (err) => {
//         if (err) console.error('Error appending to CSV:', err);
//         else console.log(`New stop added to CSV: ${stopName}`);
//     });
// };


// const importStops = async () => {
//     console.log('Importing Stops...');
//     fs.createReadStream('../sorted_unique.csv')
//         .pipe(csv())
//         .on('data', async (row) => {
//             const { name } = row;
//             if (!name) {
//                 console.error("Error: Missing stop name in row:", row);
//                 return;
//             }

//             if (!stopsCache[name]) {
//                 const stop = new Stop({ name });
//                 await stop.save();
//                 stopsCache[name] = stop._id;
//             }
//         })
//         .on('end', () => {
//             console.log('Stops import completed.');
//         })
//         .on('error', (error) => console.error('Error reading Stops file:', error));
// };


// const importRoutes = async () => {
//     console.log('Importing Routes...');
//     fs.createReadStream('../data.csv')
//         .pipe(csv())
//         .on('data', async (row) => {
//             const { number, startLocation, endLocation, intermediateStops } = row;
//             const startId = await findStop(startLocation);
//             const endId = await findStop(endLocation);

//             const intermediateStopIds = await Promise.all(
//                 intermediateStops.replace(/[\[\]']/g, '').split(',')
//                     .map(stop => findStop(stop.trim()))
//             );

//             const newRoute = new Route({
//                 number,
//                 startLocation: startId,
//                 endLocation: endId,
//                 intermediateStops: intermediateStopIds
//             });
//             await newRoute.save();
//         })
//         .on('end', () => {
//             console.log('Routes import completed.');
//         })
//         .on('error', (error) => console.error('Error reading Routes file:', error));
// };


// const importTouristPlaces = async () => {
//     console.log('Importing Tourist Places...');
//     fs.createReadStream('../tourist_places.csv')
//         .pipe(csv())
//         .on('data', async (row) => {
//             const { name, nearestBusStop, url, category, openingTime, closingTime, description } = row;

//             const nearestStopId = await findStop(nearestBusStop);

//             const newTouristPlace = new TouristPlace({
//                 name,
//                 nearestBusStop: nearestStopId,
//                 url,
//                 category,
//                 openingTime,
//                 closingTime,
//                 description
//             });

//             await newTouristPlace.save();
//         })
//         .on('end', () => {
//             console.log('Tourist Places import completed.');
//         })
//         .on('error', (error) => console.error('Error reading Tourist Places file:', error));
// };



// const fs = require('fs');
// const csv = require('csv-parser');
// const mongoose = require('mongoose');
// require('dotenv').config();

// // Models
// const Route = require('./models/Routes.Model');
// const Stop = require('./models/Stops.Model');

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('✅ Connected to MongoDB...');
//         importFromCSV();
//     })
//     .catch((error) => console.error('❌ MongoDB connection error:', error));

// // In-memory cache to prevent redundant DB lookups
// const stopsCache = {};

// // Helper to find or create a stop
// const findOrCreateStop = async (name) => {
//     if (!name) return null;

//     const trimmedName = name.trim();
//     if (stopsCache[trimmedName]) return stopsCache[trimmedName];

//     let stop = await Stop.findOne({ name: trimmedName });
//     if (!stop) {
//         stop = new Stop({ name: trimmedName });
//         await stop.save();
//     }

//     stopsCache[trimmedName] = stop._id;
//     return stop._id;
// };

// // Main import logic
// const importFromCSV = async () => {
//     console.log('📥 Importing from converted_data.csv...');
//     const rows = [];

//     // Read the file and collect rows
//     fs.createReadStream('../data.csv')
//         .pipe(csv())
//         .on('data', (row) => rows.push(row))
//         .on('end', async () => {
//             for (const row of rows) {
//                 try {
//                     const { number, startLocation, endLocation, intermediateStops } = row;

//                     if (!number || !startLocation || !endLocation) {
//                         console.warn('⚠️ Skipping incomplete row:', row);
//                         continue;
//                     }

//                     const startId = await findOrCreateStop(startLocation);
//                     const endId = await findOrCreateStop(endLocation);

//                     const intermediateStopNames = intermediateStops
//                         ?.replace(/[\[\]"]/g, '') // remove brackets/quotes
//                         .split(',')
//                         .map(s => s.trim())
//                         .filter(Boolean) || [];

//                     const intermediateStopIds = await Promise.all(
//                         intermediateStopNames.map(findOrCreateStop)
//                     );

//                     const route = new Route({
//                         number: number.trim(),
//                         startLocation: startId,
//                         endLocation: endId,
//                         intermediateStops: intermediateStopIds
//                     });

//                     await route.save();
//                     console.log(`✅ Saved route ${number.trim()}`);
//                 } catch (err) {
//                     console.error('❌ Error processing row:', row, err);
//                 }
//             }

//             console.log('✅ All routes and stops imported successfully.');
//             mongoose.connection.close();
//         })
//         .on('error', (error) => console.error('❌ Error reading CSV:', error));
// };


const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const { createObjectCsvWriter } = require('csv-writer');

// Models
const Route = require('./models/Routes.Model');
const Stop = require('./models/Stops.Model');

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('✅ Connected to MongoDB...');
        importFromCSV();
    })
    .catch((error) => console.error('❌ MongoDB connection error:', error));

// Caches and sets
const stopsCache = {};
const stopNamesSet = new Set(); // Track unique stop names

// Helper: find or create stop
const findOrCreateStop = async (name) => {
    if (!name) return null;
    const trimmed = name.trim();
    stopNamesSet.add(trimmed); // Add to set for export

    if (stopsCache[trimmed]) return stopsCache[trimmed];

    let stop = await Stop.findOne({ name: trimmed });
    if (!stop) {
        stop = await Stop.create({ name: trimmed });
    }

    stopsCache[trimmed] = stop._id;
    return stop._id;
};

// Helper: export all stops to a CSV file
const exportStopsToCSV = async () => {
    const csvWriter = createObjectCsvWriter({
        path: 'stops_output.csv',
        header: [{ id: 'name', title: 'Stop Name' }]
    });

    const records = Array.from(stopNamesSet).map(name => ({ name }));
    await csvWriter.writeRecords(records);

    console.log('📄 Exported stops to stops_output.csv');
};

// Main import function
const importFromCSV = () => {
    console.log('📥 Starting import from data.csv...');
    const rows = [];

    fs.createReadStream('../data.csv') // Change path if needed
        .pipe(csv())
        .on('data', (row) => rows.push(row))
        .on('end', async () => {
            for (const row of rows) {
                try {
                    const number = row.number?.trim();
                    const startName = row.startLocation?.trim();
                    const endName = row.endLocation?.trim();

                    if (!number || !startName || !endName) {
                        console.warn('⚠️ Incomplete row, skipping:', row);
                        continue;
                    }

                    const startId = await findOrCreateStop(startName);
                    const endId = await findOrCreateStop(endName);

                    const intermediateNames = row.intermediateStops
                        ? row.intermediateStops.replace(/[\[\]"']/g, '')
                            .split(',')
                            .map(s => s.trim())
                            .filter(Boolean)
                        : [];

                    const intermediateIds = await Promise.all(
                        intermediateNames.map(findOrCreateStop)
                    );

                    await Route.findOneAndUpdate(
                        { number },
                        {
                            number,
                            startLocation: startId,
                            endLocation: endId,
                            intermediateStops: intermediateIds
                        },
                        { upsert: true, new: true }
                    );

                    console.log(`✅ Imported/Updated route ${number}`);
                } catch (err) {
                    console.error(`❌ Error processing row: ${JSON.stringify(row)}`, err);
                }
            }

            console.log('✅ All routes processed successfully.');

            await exportStopsToCSV();
            mongoose.connection.close();
        })
        .on('error', (err) => {
            console.error('❌ Error reading CSV file:', err);
        });
};
