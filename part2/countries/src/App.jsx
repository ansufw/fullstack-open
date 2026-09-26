import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Country from './components/Country'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries'
// const weatherGEO = http://api.openweathermap.org/geo/1.0


const App = () => {
  const [textsearch, setText] = useState('')
  const [searchresult, setsearchresult] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  // handleInput
  const handleInput = (e) => {
    setText(e.target.value)
    setSelectedCountry(null)
    axios.get(`${baseURL}/api/all`)
    .then(response => {
      const countries = response.data
      const keyword = e.target.value
      const res = countries
                  .filter(curr => curr.name.common.toLowerCase()
                                  .includes(keyword.toLowerCase()))
      setsearchresult(res)
    })
  }

  // handle show button
  const showCountry = (country) => {
    setSelectedCountry(country)
  }

 

  return (
    <>
    find countries <input type='text' value={textsearch} onChange={handleInput}  />
        
      {selectedCountry
        ? <Country value={selectedCountry} />
        : textsearch.length > 0 && searchresult.length > 10
        ? <p>Too many matches, specify another filter</p>
        : searchresult.length > 1 && searchresult.length <= 10
          ? <ul>
              {searchresult.map(country =>
                <li key={country.cca3}>
                  {country.name.common} <button onClick={() => showCountry(country)}>Show</button>
                </li>
              )}
            </ul>
          : searchresult.length === 1
            ?  <Country value={searchresult[0]} />
            : null}

    </>
  )
}

export default App