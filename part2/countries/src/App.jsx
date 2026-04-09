import { useState, useEffect } from "react";
import axios from "axios";

const CountryList = ({ countries }) => {
  return countries.map((country) => (
    <p key={country.cca2}>{country.name.common}</p>
  ));
};

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>
        Capital {country.capital[0]} <br /> Area {country.area}
      </p>
      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  );
};

function App() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const matchingCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(query.toLowerCase()),
  );

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <>
      {" "}
      <form>
        find countries <input query={query} onChange={handleChange} />
      </form>
      <div>
        {matchingCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : matchingCountries.length > 1 ? (
          <CountryList countries={matchingCountries} />
        ) : matchingCountries.length === 1 ? (
          <CountryDetails country={matchingCountries[0]} />
        ) : (
          <p>No matches</p>
        )}
      </div>
    </>
  );
}

export default App;
