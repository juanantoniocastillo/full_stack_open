import { useState } from 'react'
import Header from './components/Header'
import NewEntryForm from './components/NewEntryForm'
import PhoneList from './components/PhoneList'

/* This application adds names to a Phonebook */
const App = () => {
  //state definition
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]) 
  const [newName, setNewName] = useState('')

  // app body
  return (
    <div>
      <Header text={'Phonebook'} />
      <NewEntryForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName}/>
      <PhoneList header={'Numbers'} persons={persons}/>
    </div>
  )
}

export default App