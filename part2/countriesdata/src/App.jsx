import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import SearchField from './components/SearchField'
import DataForCountries from './components/DataForCountries'
import { all } from 'axios'

/* This application allows you to view information from different countries.*/
const App = () => {
  // State definition
  const [inputCountry, setInputCountry] = useState('')
  const [allCountries, setAllCountries] = useState([])

  // Variables definition
  const state = {
    inputCountry,
    setInputCountry,
    allCountries,
    setAllCountries
  }

  // Effect definition
  useEffect(() => {
    countriesService
      .getAll()
      .then(countries => {
        setAllCountries(countries)
      })
  }, [])

  // App render body
  if (allCountries.length === 0) {
    return (
      <div>
        <p>Loading countries...</p>
      </div>
    )
  }

  return (
    <div>
      <SearchField {...state} />
      <DataForCountries {...state} />
    </div>
  )
}

export default App