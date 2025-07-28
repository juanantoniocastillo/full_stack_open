import personService from '../services/persons'

const NewEntryForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {

    const addEntry = (event) => {
        event.preventDefault()
        if (newName !== '' && newNumber !== '') {

            const nameExists = persons.some((person) => person.name.toLowerCase() === newName.toLowerCase()) //delete
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
                            })
                    }                   
                }
            } else {
                const maxId = Math.max(...persons.map(person => parseInt(person.id)))
                const newPerson = { name: newName, number: newNumber, id: String(maxId + 1) }
                personService
                    .addPerson(newPerson)
                    .then(returnedPerson => {
                        setPersons(persons.concat(returnedPerson))
                        setNewName('')
                        setNewNumber('')
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