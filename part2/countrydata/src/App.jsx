import { useEffect, useState } from 'react'
import axios from 'axios'

import Country from './components/Country'

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

  // const onSearch = (event) => {
  //   event.preventDefault()

  //   setCountryToSearch(value)
  // }

  return (
    <>
      <div>
        {/* <form onSubmit={onSearch}> */}
        Country: <input value={value} onChange={handleChange} />
        {/* </form> */}
        <Country countries={countries} value={value} />

      </div>
    </>
  )
}

export default App
