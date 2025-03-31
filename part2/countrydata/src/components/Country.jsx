import { useEffect, useState } from 'react'

const OneCountryTemplate = ({ country }) => {


    if (!country)
        return
    return (
        <div>
            <h1>{country.name.common}</h1>
            Capital {country.capital}<br />Area {country.area}
            <h2>Languages</h2>
            <ul>
                {Object.entries(country.languages).map(l =>
                    <li key={l[0]}>
                        {l[1]}
                    </li>)}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} />
        </div>
    )

}

const Country = ({ countries, value }) => {
    const [showingCountry, setShowingCountry] = useState(null)

    useEffect(() => {
        setShowingCountry(null)
    }, [countries])

    const handleClick = (event) => {

        const selectedCountry = countries.filter(c => c.name.common === event.target.id)
        setShowingCountry(selectedCountry[0])
        
        

    }

    if (!countries) {
        return
    }
    else if (countries.length > 10) {

        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    else if (countries.length > 1) {
        //console.log(showingCountry.name.common);

        return (
            <div>
                {countries.map(c =>
                    <div key={c.name.official}>
                        {c.name.common}
                        <button id={c.name.common} onClick={handleClick}>Show</button>
                    </div>
                )}
                {!showingCountry ? "" : <OneCountryTemplate country={showingCountry} />}
            </div>
        )

    }
    else if (countries.length === 1) {
        const country = countries[0]
        return (
            <OneCountryTemplate country={country} />
        )

    }

}

export default Country