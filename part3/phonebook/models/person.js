// modules import
const mongoose = require('mongoose')


// mongoose settings
mongoose.set('strictQuery',false)


// variables definition
const url = process.env.MONGODB_URI


// connection to DB
console.log('Connecting to MongoDB...')

mongoose.connect(url)
    .then(result => {
        console.log('Connected to MongoDB')
    })
    .catch(error => {
        console.log('Error connecting to MongoDB:', error.message)
    })


// schema definition
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


// module export
module.exports = mongoose.model('Person', personSchema)