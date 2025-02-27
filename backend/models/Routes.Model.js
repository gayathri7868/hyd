const mongoose = require('mongoose')

const routeSchema = mongoose.Schema({
    number: {
        type: String, require: true
    },
    startLocation: {
        type: mongoose.Schema.Types.ObjectId, ref: 'stop', require: true
    },
    endLocation: {
        type: mongoose.Schema.Types.ObjectId, ref: 'stop', require: true
    },
    intermediateStops: {
        type: [mongoose.Schema.Types.ObjectId], ref: 'stop', require: true
    }
})

const routeModel = mongoose.model('routes', routeSchema)

module.exports = routeModel