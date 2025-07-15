const NewEntryForm = ({persons, setPersons, newName, setNewName, newNumber, setNewNumber}) => {

    const addEntry = (event) => {
        event.preventDefault()
        if (newName !== '' && newNumber !== '') {
            const isRepeated = persons.some((person) => person.name.toLowerCase() === newName.toLowerCase())
            if (isRepeated) {
                alert(`${newName} is already added to phonebook`)
            } else {
                const newPerson = { name: newName, number: newNumber, id: (persons.length + 1) }
                setPersons(persons.concat(newPerson))
                setNewName('')
                setNewNumber('')
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