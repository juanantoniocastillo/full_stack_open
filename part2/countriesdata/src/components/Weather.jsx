import { useState, useEffect } from 'react'
import SubHeader from "./SubHeader"
import weatherService from '../services/weather'

const Weather = ({country}) => {

    const [weatherData, setWeatherData] = useState(null)
    const [fetchError, setFetchError] = useState(null)

    const subHeaderText = `Wheather in ${country.capital}`

    useEffect(() => {
        weatherService
            .getWeatherOf(country.latlng[0], country.latlng[1])
            .then(data => setWeatherData(data))
            .catch(error => setFetchError(error))
    }, [country])
    
    if (fetchError) {
        return (
            <div>
                <SubHeader text={subHeaderText} />
                <p>Weather information is not available at the moment.</p>
            </div>
        )
    }

    return (
        <div>
            <SubHeader text={subHeaderText} />
            {weatherData ? (
                <div>
                    <p>Temperature {weatherData.main.temp} Celsius</p>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
                    <p>Wind {weatherData.wind.speed} m/s</p>
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    )
}

export default Weather