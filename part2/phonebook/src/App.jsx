import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header'
import NewEntryForm from './components/NewEntryForm'
import PhoneList from './components/PhoneList'

/* This application adds names and numbers to a Phonebook,
prevents to add duplicate names and implement a name filter field. */
const App = () => {
  //state definition
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // Effect definition
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  // app body. Note: Exercise 10 was already done before
  return (
    <div>
      <Header text={'Phonebook'} />
      <NewEntryForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <PhoneList header={'Numbers'} persons={persons} filter={filter} setFilter={setFilter} />
    </div>
  )
}

export default App