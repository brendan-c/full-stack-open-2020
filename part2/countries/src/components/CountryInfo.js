import React, {useEffect} from 'react'
import axios from 'axios'

const CountryInfo = ({country, weather, setWeather}) => {
    

    const params = {
        access_key: process.env.REACT_APP_WEATHERSTACK_API_KEY,
        query: country.capital
      }

    useEffect(() => {
        axios
        .get(`http://api.weatherstack.com/current`, {params})
        .then(response => {
            console.log(response.data)
            setWeather(response.data.current)
        })
    }, [])

  console.log(weather)

  return(
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {
          country.languages
            .map(language => 
              <li key={language.name}>
                {language.name}
              </li>)
        }
      </ul>
      <br />
      <img 
        src={country.flag}
        width='200' 
        border="1" 
        alt={`${country.name}'s flag`} 
      />
      
      <h2>Weather in {country.capital}</h2>
      <b>temperature:</b> {weather.temperature} celcius
      <img src={weather.weather_icons[0]} alt={`${country.capital}'s weather`} />
      <b>wind:</b> {weather.wind_speed}mph {weather.wind_dir}
    </div>
  )
}

export default CountryInfo