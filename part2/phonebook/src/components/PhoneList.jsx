import SubHeader from "./SubHeader"

const PhoneList = ({header, persons}) => {
    return(
        <div>
            <SubHeader text={header} />
            {persons.map((person) => (<p key={person.name}>{person.name} {person.number}</p>))}
        </div>
    )
}

export default PhoneList