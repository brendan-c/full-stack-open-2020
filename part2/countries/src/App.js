import React , { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

import CountryInfo from './components/CountryInfo'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState({})


  const handleFilterChange = event =>{
    setFilter(event.target.value.toLowerCase())
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])



  const filteredCountries = () => countries.filter(country => country.name.toLowerCase().includes(filter))
    

  const countryListing = country => (
      <li key={country.name}>
        {country.name} 
        <button onClick={() => setFilter(country.name.toLowerCase())}>
          show
        </button>
      </li>
    )

  return (
    <div>
      find countries
      <input onChange={handleFilterChange} />

      <ul>
        {
        !filter.length 
        ? ''
        : filteredCountries().length > 10
            ? 'Too many matches, specify another filter'
            : filteredCountries().length === 1
              ? <CountryInfo country={(filteredCountries()[0])} weather={weather} setWeather={setWeather} />
              : filteredCountries()
                .map(country => countryListing(country))
        }
      </ul>
    </div>
  );
}

export default App;
