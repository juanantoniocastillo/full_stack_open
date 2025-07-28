import personsService from '../services/persons'

const PersonsList = ({filter, persons, setPersons}) => {
    const personsToShow = (filter === '') ? persons : persons.filter( (person) => person.name.toLowerCase().includes( filter.toLowerCase() ) )

    const handleClick = (id) => {
        const nameToDelete = personsToShow.find(person => person.id === id).name
        if (window.confirm(`You are going to delete ${nameToDelete}. Do you want to proceed?`)) {
            personsService
                .deletePerson(id)
                .then(response => {
                    setPersons(persons.filter(person => person.id !== id))
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