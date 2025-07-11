const mongoose = require('mongoose')

const touristSchema = mongoose.Schema({
    name: {
        type: String, require: true
    },
    nearestBusStop: {
        type: [String], require: true
    }
    ,
    url: {
        type: [String]
    },
    category: {
        type: String
    },
    openingTime: {
        type: String
    },
    closingTime: {
        type: String
    },
    description: {
        type: String
    }
})

const touristModel = mongoose.model('tourists', touristSchema)

module.exports = touristModel