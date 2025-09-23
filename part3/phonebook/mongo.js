const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('\nPlease, give password as argument.')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://juanantoniocas5:${password}@cluster0.shphbhw.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
    Person.find({}).then(result => {
        console.log('\nPhonebook:')
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    })
} else if (process.argv.length == 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
    })
    person.save().then(result => {
        console.log(`\nAdded ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    console.log('\nYou have entered more or less arguents than necessary. Enter only [password] to display all entries or [password] [name] [number] to add a new entry.')
    mongoose.connection.close()
}