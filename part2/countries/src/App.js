import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./Components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let url = "https://restcountries.com/v3.1/all";
    axios
      .get(url)
      .then((response) => setCountries(response.data))
      .catch((e) => console.log(e));
  }, []);

  const searchTermChanged = (event) => {
    setSearchTerm(event.target.value);
  };

  const getMatchingCountries = () => {
    return countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const matchingCountries = getMatchingCountries();

  return (
    <div>
      <div>
        find countries: <input onChange={searchTermChanged} />
      </div>

      <Countries countries={matchingCountries} />
    </div>
  );
};

export default App;
