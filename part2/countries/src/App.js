import { useState, useEffect } from 'react'
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY

const DisplayCountries = ({ countries, onClick, weather }) => {
  console.log(countries)
  const numOfCountries = countries.length
  if (numOfCountries > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  } else if (numOfCountries > 1) {
    console.log('DisplayCountries 2-10:', countries)
    return (
      <>
        {countries.map(country => {
            return (
            <p key={country.name.official}>{country.name.common}
              <Button 
                text="show" 
                onClick={onClick} 
                cname={country.name.common}/>
            </p>
            )
          })
        }
      </>
    )
  } else if (numOfCountries === 1) {
    console.log('DisplayCountries Single:', countries)
    return (
      <Country c={countries[0]} weather={weather} />
    )
  } else {
    return (
      <p>There are no countries that meet the filter criteria</p>
    )
  }
}

const Country = ({ c, weather }) => {
  const getLanguages = () => Object.values(c.languages)
  console.log(weather)
  return (
    <div>
      <h2>{c.name.common}</h2>

      <p>Capital: {c.capital[0]}</p>
      <p>Area: {c.area}</p>

      <h3>languages:</h3>
      <ul>
        {getLanguages().map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={c.flags.png} alt={`Country flag of ${c.name.common}`} />
      <h3>Weather in {c.capital}</h3>
      <p>temperature {weather.main.temp} F&#176;</p>
      <p>weather icon</p>
      <p>wind {weather.wind.speed} mph</p>
    </div>
  )
}

const FilterCountries = ({ filterBy, onChange }) => {
  return (
    <div>
      filter countries <input 
        value={filterBy}
        onChange={onChange}
      />
    </div>
  )
}

const Button = ({ text, onClick, cname }) => {
  return (
    <button data-cname={cname} onClick={onClick}>
      {text}
    </button>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [filterBy, setFilterBy] = useState('')
  // const [showDetail, setShowDetail] = useState('')

  const [location, setLocation] = useState({})
  const [weather, setWeather] = useState({})
  
  const isNotSameCountry = (country) => {
    return country.cca3 !== location.country
  }

  const showCountries = (() => {
    const filterInput = filterBy.toLowerCase().trim()
    if (filterInput.length === 0) return countries

    const countriesList = countries.filter( country => 
      country.name.common.toLowerCase().includes(filterInput) )

    if (countriesList.length === 1 && isNotSameCountry(countriesList[0])) {
      const weatherLocation = {
        city: countriesList[0].capital[0],
        country: countriesList[0].cca3
      }
      console.log('showCountries location:', weatherLocation)
      setLocation(weatherLocation)
    }
    return countriesList
  })()

  const countriesHook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => {
        setCountries(res.data)
      })
  }
  useEffect(countriesHook, [])

  const weatherHook = () => {
    console.log('weatherHook:', location)
    if (location.city !== undefined) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${location.city},${location.country}&units=imperial&lang=en&appid=${api_key}`)
        .then(res => {
          setWeather(res.data)
        })
    }
  }
  useEffect(weatherHook, [location])
  
  const handleFilterChange = (event) => setFilterBy(event.target.value)

  const handleShowCountry = (event) => {
    const countryName = event.target.getAttribute('data-cname')
    setFilterBy(countryName)
  }

  return (
    <>
      <FilterCountries 
        filterBy={filterBy} 
        onChange={handleFilterChange}
      />
      <DisplayCountries 
        countries={showCountries} 
        onClick={handleShowCountry}
        weather={weather}
         />
    </>
  );
}

export default App;
