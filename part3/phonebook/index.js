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
app.get('/info', (req, res, next) => {
  const req_time = new Date().toString()
  Person
    .find({})
    .then(persons => {
      res.send(`Phonebook has info for ${persons.length} people.<br><br>${req_time}`)
    })
    .catch(error => next(error))
})

// Get all resources
app.get('/api/persons', (req, res, next) => {
  Person
    .find({}).then(persons => {
      res.json(persons)
    })
    .catch(error => next(error))
})

// Get a specific resource
app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  Person
    .findById(id)
    .then(person => {
      res.json(person)
    })
    .catch(error => next(error))
})

// Delete a specific resource
app.delete('/api/persons/:id', (req, res, next) => {
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
    .catch(error => next(error))
})

// Add a new resource
app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'Name or number missing'
    })
  }

  const newPerson = new Person({
    name: body.name,
    number: body.number,
  })

  newPerson
    .save()
    .then(savedPerson => {
      res.json(savedPerson)
    })
    .catch(error => next(error))
})

// Error handler
const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    res.status(400).send({error: 'malformatted id'})
  }

  next(error)
}

app.use(errorHandler)

// Listen to HTTP requests
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})