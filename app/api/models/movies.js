const mongoose = require('mongoose')

// Define the Schema
const Schema = mongoose.Schema

const MovieSchema = new Schema({
    name: {
        type: String,
        trim: true,
        require: true
    },
    released_on: {
        type: Date,
        trim: true,
        require: true
    },

})

module.exports = mongoose.model('Movie', MovieSchema)