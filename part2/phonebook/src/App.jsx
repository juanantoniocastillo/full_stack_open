import { useState, useEffect } from 'react'
import personsService from './services/persons'
import Header from './components/Header'
import NewEntryForm from './components/NewEntryForm'
import PhoneList from './components/PhoneList'
import Notification from './components/Notification'

/* This application adds names and numbers to a Phonebook,
prevents to add duplicate names and implement a name filter field. */
const App = () => {
  //state definition
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationInfo, setNotificationInfo] = useState({ message: null, error: false })

  // Effect definition
  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  // app body. Note: Exercise 10 was already done before
  return (
    <div>
      <Header text={'Phonebook'} />
      <Notification notificationInfo={notificationInfo} />
      <NewEntryForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setNotificationInfo={setNotificationInfo}
      />
      <PhoneList
        header={'Numbers'}
        persons={persons}
        setPersons={setPersons}
        filter={filter}
        setFilter={setFilter}
        setNotificationInfo={setNotificationInfo}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
    </div>
  )
}

export default App