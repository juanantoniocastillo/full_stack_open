import SubHeader from "./SubHeader"
import FilterField from "./FilterField"

const PhoneList = ({header, persons, filter, setFilter}) => {
    const personsToShow = (filter === '') ? persons : persons.filter( (person) => person.name.toLowerCase().includes( filter.toLowerCase() ) )
    return(
        <div>
            <SubHeader text={header} />
            <FilterField filter={filter} setFilter={setFilter} />
            { personsToShow.map((person) => (<p key={person.id}>{person.name} {person.number}</p>)) }
        </div>
    )
}

export default PhoneList