import personsService from '../services/persons'

const PersonsList = ({filter, persons, setPersons, setNotificationInfo, setNewName, setNewNumber}) => {
    const personsToShow = (filter === '') ? persons : persons.filter( (person) => person.name.toLowerCase().includes( filter.toLowerCase() ) )

    const handleClick = (id) => {
        const nameToDelete = personsToShow.find(person => person.id === id).name
        if (window.confirm(`${nameToDelete} will be deleted. Do you want to proceed?`)) {
            personsService
                .deletePerson(id)
                .then(response => {
                    setPersons(persons.filter(person => person.id !== id))
                })
                .catch(error => {
                    setNotificationInfo({
                        message: `${nameToDelete} has already been removed from server.`,
                        error: true
                    })
                    setPersons(persons.filter(person => person.id !== id))
                    setNewName('')
                    setNewNumber('')
                    setTimeout(() => setNotificationInfo({ message: null, error: false }), 5000)
                })
        }
    }

    return (
        <div>
            {personsToShow.map(person => (
                <div key={person.id}>
                    {person.name} {person.number} <button onClick={() => handleClick(person.id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default PersonsList