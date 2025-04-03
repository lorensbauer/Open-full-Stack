import axios from 'axios'
import { useEffect, useState } from 'react'

const OneCountryTemplate = ({ country }) => {

    const [countryWeather, setCountryWeather] = useState(null)

    const [lat, lng] = country.latlng


    useEffect(() => {

        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${import.meta.env.VITE_SOME_KEY}&units=metric`)
            .then(response => {
                setCountryWeather(response.data)
                
    })

    }, [])

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
            <h2>Weather in Helsinki</h2>
            {countryWeather ? (
                <>
                    Temperature {countryWeather.main.temp} Celsius <br />
                    <img src={`https://openweathermap.org/img/wn/${countryWeather.weather[0].icon}@2x.png`} alt={countryWeather.weather[0].description} /><br />
                    Wind {countryWeather.wind.speed} m/s
                </>
            ) : (
                <>
                    Loading Weather data...
                </>
            )

            }

        </div>
    )

}

const Country = ({ countries, value }) => {
    const [showingCountry, setShowingCountry] = useState(null)

    useEffect(() => {
        setShowingCountry(null)
    }, [countries])

    const handleClick = (event) => {
        if (event.target.innerText === "Show") {
            const selectedCountry = countries.filter(c => c.name.common === event.target.id)
            setShowingCountry(selectedCountry[0])
            event.target.innerText = "Hide"
        }
        else {
            setShowingCountry(null)
            event.target.innerText = "Show"
        }
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