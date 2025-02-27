const mongoose = require('mongoose')

const stopSchema = mongoose.Schema({
    name: { type: String, required: true }
})

const stopModel = mongoose.model('stops', stopSchema)

module.exports = stopModel