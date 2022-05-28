import React, { useState, useEffect } from "react";
import axios from "axios";

const DetailedCountryView = ({ country }) => {
  const langs = Object.values(country.languages);
  const [fetchingWeather, setFetchingWeather] = useState(true);
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}`;
    axios.get(url).then((response) => {
      setWeather(response.data);
      setFetchingWeather(false);
    });
  }, []);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Offically: {country.name.official}</p>
      <p>Captial: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {langs.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img src={country.flags.png} height="50" alt="Flag of the country" />
      <img
        src={country.coatOfArms.png}
        height="50"
        alt="coat of arms of the country"
      />
      {!fetchingWeather && (
        <div>
          <h3>Weather in {country.capital}</h3>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <p>{weather.weather[0].description}</p>
          <p>
            <strong>temp:</strong> {weather.main.temp - 273} C
          </p>
          <p>
            <strong>humidity:</strong> {weather.main.humidity} %
          </p>
          <p>
            <strong>pressure:</strong> {weather.main.pressure} hPa
          </p>
        </div>
      )}
    </div>
  );
};

const CountryView = ({ country }) => {
  const [display, setDisplay] = useState(false);
  const toggleDisplay = () => setDisplay(!display);

  return (
    <div>
      {country.name.common}{" "}
      <button onClick={toggleDisplay}>{display ? "hide" : "show"} </button>
      {display && <DetailedCountryView country={country} />}
    </div>
  );
};

const Countries = ({ countries }) => {
  const moreThanTen = countries.length > 10;

  const createCountryList = () => {
    if (countries.length === 1) {
      return <DetailedCountryView country={countries[0]} />;
    } else {
      return countries.map((country) => (
        <div key={country.name.common}>
          <CountryView key={country.cca3} country={country} />
        </div>
      ));
    }
  };

  return (
    <div>
      {moreThanTen ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        <div>
          <h2>Countries</h2>
          {createCountryList()}
        </div>
      )}
    </div>
  );
};

export default Countries;
