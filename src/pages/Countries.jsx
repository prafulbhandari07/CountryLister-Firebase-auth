import React, { useEffect, useState } from "react";

export default function Countries() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountryData();
  }, []);

  async function fetchCountryData() {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    setCountries(data);
  }

  return (
    <div
      style={{
        width: "100vw",
      }}
    >
      <div>
        {countries.map((country) => {
          return (
            <div style={{ paddingLeft: "1rem" }}>
              <img src={country.flags.png} alt="" />
              <h1>Name : {country.name.official}</h1>
              <h2>Region: {country.region}</h2>
              <h5>Description: {country.flags.alt}</h5>
              <hr></hr>
            </div>
          );
        })}
      </div>
    </div>
  );
}
