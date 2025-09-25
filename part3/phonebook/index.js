// Imports
require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const Person = require('./models/person')

// App initialization
const app = express()

// Morgan tokens
morgan.token('postData', (req, res) => (JSON.stringify(req.body)))

// Middleware
app.use(express.static('frontend/dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'))


// API operations

// Get info
app.get('/info', (req, res) => {
  const req_time = new Date().toString()
  Person.find({}).then(persons => {
    res.send(`Phonebook has info for ${persons.length} people.<br><br>${req_time}`)
  })
})

// Get all resources
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

// Get a specific resource
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id

  Person
    .findById(id)
    .then(person => {
      res.json(person)
    })
    .catch(error => {
      console.log(`Error getting ID ${id}: ${error.message}`)
      res.statusMessage = `ID ${id} not found.`
      res.status(404).end()
    })
})

// Delete a specific resource
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  Person
    .findByIdAndDelete(id)
    .then(deletedPerson => {
      if (!deletedPerson) {
        res.status(404).end()
      } else {
        res.status(204).end()
      }
    })
})

// Add a new resource
app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'Name or number missing'
    })
  }

  // const repeated_name = persons.find(person => person.name === body.name)

  // if (repeated_name) {
  //   return res.status(400).json({
  //     error: 'Name already exists'
  //   })
  // }
  const newPerson = new Person({
    name: body.name,
    number: body.number,
  })

  newPerson
    .save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
})


// Listen to HTTP requests
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})