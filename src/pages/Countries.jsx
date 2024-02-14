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

      <div id="container">
        <table id="countryTable">
          <thead>
            <tr>
              <th>Country's Flag</th>
              <th>Country's Name</th>
              <th>Region</th>
              <th>Subregion</th>
              <th>Population</th>
            </tr>
          </thead>
          <tbody>
            {currentCountries.map((country) => {
              return (
                <tr>
                  <td>
                    <img src={country.flags.png} alt="" />
                  </td>
                  <td>{country.name.official}</td>
                  <td>{country.region}</td>
                  <td>{country.subregion}</td>
                  <td>{country.population}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        lastPage={Math.ceil(countries.length / countriesPerPage)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
