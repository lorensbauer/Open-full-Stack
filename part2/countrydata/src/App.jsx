import { useEffect, useState } from 'react'
import axios from 'axios'

const Country = ({ countries }) => {
  if (countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  else if (countries.length > 1) {
    return (
      <div>
        {countries.map(c =>
          <div key={c.name.official}>
            {c.name.common}
          </div>
        )}
      </div>
    )

  }
  else if (countries.length === 1) {
    const country = countries[0]
    
    return (
      <div>
        <h1>{country.name.common}</h1>
        Capital {country.capital}<br />Area {country.area}
        <h2>Languages</h2>
        <ul></ul>

      </div>
    )

  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [countryToSearch, setCountryToSearch] = useState(null)
  const [value, setValue] = useState('')


  const handleChange = (event) => {
    setValue(event.target.value)
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all/`)
      .then(response => {
        const paisesFiltrados = response.data.filter(c => c.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
        setCountries(paisesFiltrados)

      })
  }

  const onSearch = (event) => {
    event.preventDefault()
    setCountryToSearch(value)
  }

  return (
    <>
      <div>
        <form onSubmit={onSearch}>
          Country: <input value={value} onChange={handleChange} />
        </form>
        <Country countries={countries} />

      </div>
    </>
  )
}

export default App
