const NewEntryForm = ({persons, setPersons, newName, setNewName}) => {

    const addEntry = (event) => {
        event.preventDefault()
        if (newName !== '') {
            const newPerson = { name: newName }
            setPersons(persons.concat(newPerson))
            setNewName('')
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    return (
        <form onSubmit={addEntry}>
            <div>
                Name: <input value={newName} onChange={handleNameChange} />
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    )
}

export default NewEntryForm