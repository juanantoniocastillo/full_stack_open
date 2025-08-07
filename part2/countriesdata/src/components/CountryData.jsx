import Header from './Header'
import SubHeader from './SubHeader'
import BasicCountryData from './BasicCountryData'
import Languages from './Languages'
import Flag from './Flag'
import Weather from './Weather'

const CountryData = ({country}) => (
    <div>
        <Header text={country.name.common} />
        <BasicCountryData country={country} />
        <SubHeader text='Languages' />
        <Languages languages={country.languages} />
        <Flag flag={country.flags} />
        <Weather country={country} />
    </div>
)

export default CountryData