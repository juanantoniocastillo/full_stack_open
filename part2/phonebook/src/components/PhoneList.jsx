import SubHeader from "./SubHeader"
import FilterField from "./FilterField"
import PersonsList from "./PersonsList"

const PhoneList = ({header, persons, setPersons, filter, setFilter}) => (
    <div>
        <SubHeader text={header} />
        <FilterField filter={filter} setFilter={setFilter} />
        <PersonsList filter={filter} persons={persons} setPersons={setPersons}/>
    </div>
)

export default PhoneList