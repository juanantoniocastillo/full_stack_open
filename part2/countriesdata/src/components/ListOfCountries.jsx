const ListOfCountries = ({filteredCountries, setInputCountry}) => {

    const handleClick = (countryName) => {
        setInputCountry(countryName)
    }

    return (
        <div>
            {filteredCountries.map(country => (
                <div key={country.name.common}>
                    {country.name.common} <button onClick={() => handleClick(country.name.common)}>Show</button>
                </div>
            ))}
        </div>
    )
    
}

export default ListOfCountries