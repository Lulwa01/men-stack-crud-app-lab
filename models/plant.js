const mongoose = require('mongoose')


//1. create the schema
const plantSchema = new mongoose.Schema({
    name: String,
    isSave: Boolean
})

//2. register the model
const Plant = mongoose.model('Plant', plantSchema)

//3. share it with the rest of the app
module.exports = Plant