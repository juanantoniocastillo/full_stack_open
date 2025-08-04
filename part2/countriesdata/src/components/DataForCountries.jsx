import CountryData from "./CountryData"

const DataForCountries = ({inputCountry, allCountries}) => {

    if (inputCountry === '') {
        return (
            <div>
                <p>Please, specify a filter to show data for countries.</p>
            </div>
        )
    }

    const filteredCountries = allCountries.filter(country => country.name.common.toLowerCase().includes(inputCountry.toLowerCase()))
    console.log('filteredCountries', filteredCountries)

    if (filteredCountries.length === 0) {
        return (
            <div>
                <p>There is 0 matches for that filter.</p>
            </div>
        )
    } if (filteredCountries.length === 1) {
        return (
            <CountryData country={filteredCountries[0]} />
        )
    } if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
        return (
            <div>
                {filteredCountries.map(country => (
                    <p key={country.name.common}>{country.name.common}</p>
                ))}
            </div>
        )
    } if (filteredCountries.length > 10) {
        return (
            <div>
                <p>Too many matches, specify another filter.</p>
            </div>
        )
    } else {
        return (
            <div>
                <p>Something went wrong. Please contact the website administrator.</p>
            </div>
        )
    }
}

export default DataForCountries