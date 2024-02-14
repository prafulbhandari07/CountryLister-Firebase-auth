import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Pagination from "../components/Pagination";

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(5);

  useEffect(() => {
    fetchCountryData();
  }, []);

  async function fetchCountryData() {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    setCountries(data);
  }

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );
  return (
    <>
      <Header />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: "100%",
          margin: "0 auto",
          width: "100%",
          gap: "8px",
          justifyContent: "space-between",
          backgroundColor: "white",
          color: "black",
        }}
      >
        {currentCountries.map((country) => {
          return (
            <div id="countryCont">
              <img src={country.flags.png} alt="" />
              <h2>Country - {country.name.official}</h2>
              <br></br>
              <h4>Region - {country.region}</h4>
              <br></br>
              <h5>Sub Region - {country.subregion}</h5>
              <br></br>
              <small>Population - {country.population}</small>
              <hr></hr>
            </div>
          );
        })}
      </div>
      <Pagination
        lastPage={Math.ceil(countries.length / countriesPerPage)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
