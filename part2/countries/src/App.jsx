import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Country from './components/Country'

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/'

const App = () => {
  const [textsearch, setText] = useState('')
  const [searchresult, setsearchresult] = useState([])

  // console.log('search words outside:', textsearch)
  const handleInput = (e) => {
    setText(e.target.value)
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

 

  return (
    <>
    find countries <input type='text' value={textsearch} onChange={handleInput}  />
        
      {textsearch.length > 0 && searchresult.length > 10
        ? <p>Too many matches, specify another filter</p>
        : searchresult.length > 1 && searchresult.length <= 10
          ? <ul>
              {searchresult.map(country =>
                <li key={country.cca3}>{country.name.common}</li>
              )}
            </ul>
          : searchresult.length === 1
            ? <Country value={searchresult[0]} />
            : null}
    </>
  )
}

export default App