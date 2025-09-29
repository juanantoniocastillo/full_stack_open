import personService from '../services/persons'

const NewEntryForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber, setNotificationInfo}) => {

    const addEntry = (event) => {
        event.preventDefault()
        if (newName !== '' && newNumber !== '') {

            const repeatedEntry = persons.find( person => person.name.toLowerCase() === newName.toLowerCase() )

            if (repeatedEntry !== undefined) {
                if (newNumber === repeatedEntry.number) {
                    alert(`${newName} is already added to phonebook`)
                } else{
                    if (window.confirm(`${newName} is already added to phonebook. Do you want to replace the old number with the new one?`)) {
                        const updatedPerson = {...repeatedEntry, number: newNumber}
                        personService
                            .updatePerson(updatedPerson.id, updatedPerson)
                            .then(response => {
                                setPersons(persons.map(person => person.id === updatedPerson.id ? response : person))
                                setNewName('')
                                setNewNumber('')
                                setNotificationInfo({ message: `Updated ${updatedPerson.name}'s number.`, error: false })
                                setTimeout(() => setNotificationInfo({ message: null, error: false }), 5000)
                            })
                            .catch(error => {
                                console.log('Error:\n', error)

                                if (error.status === 400) {
                                    setNotificationInfo({ message: 'Number has incorrect format. Please check it.', error: true })
                                } else if (error.status === 404) {
                                    setNotificationInfo({ message: `Information of ${updatedPerson.name} has already been removed from server.`, error: true })
                                    setPersons(persons.filter(person => person.id !== updatedPerson.id))
                                    setNewName('')
                                    setNewNumber('')
                                } else {
                                    setNotificationInfo({ message: error.response.data, error: true })
                                }
                                
                                setTimeout(() => setNotificationInfo({ message: null, error: false }), 5000)
                            })
                    }                   
                }
            } else {
                const newPerson = { name: newName, number: newNumber }
                personService
                    .addPerson(newPerson)
                    .then(returnedPerson => {
                        setPersons(persons.concat(returnedPerson))
                        setNewName('')
                        setNewNumber('')
                        setNotificationInfo({ message: `Added ${returnedPerson.name}.`, error: false })
                        setTimeout(() => setNotificationInfo({ message: null, error: false }), 5000)
                    })
                    .catch(error => {
                        setNotificationInfo({ message: error.response.data.error, error: true })
                        setTimeout(() => setNotificationInfo({ message: null, error: false }), 5000)
                    })
            }
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <form onSubmit={addEntry}>
            <div>
                Name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                Number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default NewEntryForm