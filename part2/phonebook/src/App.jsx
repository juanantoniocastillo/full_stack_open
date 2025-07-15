import { useState } from 'react'
import Header from './components/Header'
import NewEntryForm from './components/NewEntryForm'
import PhoneList from './components/PhoneList'

/* This application adds names and numbers to a Phonebook,
prevents to add duplicate names and implement a name filter field. */
const App = () => {
  //state definition
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 },
    { name: 'Perico Palotes', number: '956 08 22 13', id: 2 },
    { name: 'Makina Jhonny', number: '634 126 384', id: 3 },
    { name: 'Gordo Master', number: '044-8957236', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  // app body
  return (
    <div>
      <Header text={'Phonebook'} />
      <NewEntryForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <PhoneList header={'Numbers'} persons={persons} filter={filter} setFilter={setFilter} />
    </div>
  )
}

export default App