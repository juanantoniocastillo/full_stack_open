import Header from './Header'
import SubHeader from './SubHeader'
import BasicCountryData from './BasicCountryData'
import Languages from './Languages'
import Flag from './Flag'

const CountryData = ({country}) => {
    console.log('selected country', country)

    return (
        <div>
            <Header text={country.name.common} />
            <BasicCountryData country={country} />
            <SubHeader text='Languages' />
            <Languages languages={country.languages} />
            <Flag flag={country.flags} />
        </div>
    )
}

export default CountryData