import { useState, useEffect } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const App = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [shows, setShows] = useState([]);
  const [weather, setWeather] = useState({});

  useEffect(() => {
    if (query) {
      const apiURL = `https://restcountries.eu/rest/v2/name/${query}`;
      axios.get(apiURL).then((response) => {
        setCountries(response.data);
        setShows(new Array(response.data.length).fill(0));
        if (response.data.length === 1) {
          const weatherAPI = `http://api.weatherstack.com/current?access_key=${api_key}&query=${query}`;
          axios
            .get(weatherAPI)
            .then((response) => setWeather(response.data.current));
        }
      });
    }
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleShowDetails = (index) => {
    const copy = [...shows];
    if (!copy[index]) {
      copy[index] = 1;
    } else {
      copy[index] = 0;
    }
    setShows(copy);
  };

  const displayCountriesDetails = () => {
    let details;
    if (countries.length > 10) {
      details = <p>Too many matches, specify another filter</p>;
    } else if (countries.length === 1) {
      details = (
        <div>
          <h1>{countries[0].name}</h1>
          <p>capital {countries[0].capital}</p>
          <p>population {countries[0].population}</p>
          <h2>languages</h2>
          <ul>
            {countries[0].languages.map((language) => (
              <li key={language.iso639_1}>{language.name}</li>
            ))}
          </ul>
          <img style={{ width: "10%" }} src={countries[0].flag} alt="flag" />
          {weather && Object.keys(weather).length !== 0 ? (
            <>
              {" "}
              <h2>Weather in {countries[0].capital}</h2>
              <p>temperature: {weather.temperature} Celsius</p>
              <img src={weather.weather_icons[0]} alt="weather" />
              <p>
                wind: {weather.wind_speed} km/h direction {weather.wind_dir}
              </p>{" "}
            </>
          ) : null}
        </div>
      );
    } else {
      details = countries.map((country, index) => (
        <div key={country.alpha2Code}>
          <p>{country.name}</p>
          <button onClick={() => handleShowDetails(index)}>
            {!shows[index] ? "show" : "hide"}
          </button>
          {shows[index] ? (
            <>
              <h1>{country.name}</h1>
              <p>capital {country.capital}</p>
              <p>population {country.population}</p>
              <h2>languages</h2>
              <ul>
                {country.languages.map((language) => (
                  <li key={language.iso639_1}>{language.name}</li>
                ))}
              </ul>
              <img style={{ width: "10%" }} src={country.flag} alt="flag" />
            </>
          ) : null}
        </div>
      ));
    }
    return details;
  };

  return (
    <>
      <div>
        find countries <input value={query} onChange={handleInputChange} />
      </div>
      {displayCountriesDetails()}
    </>
  );
};

export default App;
