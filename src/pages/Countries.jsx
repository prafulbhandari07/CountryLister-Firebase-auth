import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Pagination from "../components/Pagination";

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(5);
  const [inputText, setInputText] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetchCountryData();
  }, []);

  useEffect(() => {
    const filteredItems = countries.filter((country) => {
      const input = inputText.toLowerCase();
      const name = country.name.official.toLowerCase();
      return name.includes(input);
    });

    setFilteredCountries(filteredItems);
  }, [inputText, countries]);

  async function fetchCountryData() {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(
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
              <th
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <h4>Search Countries Here👉🏻 </h4>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  style={{ border: "1px solid black" }}
                />
              </th>
              <th>Region</th>
              <th>Subregion</th>
              <th>Population</th>
            </tr>
          </thead>
          <tbody>
            {currentCountries.map((country) => {
              return (
                <tr key={country.cca3}>
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
        lastPage={Math.ceil(filteredCountries.length / countriesPerPage)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
