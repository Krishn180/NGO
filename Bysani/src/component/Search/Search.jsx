import React, { useState } from "react";
import searchIcon from "../../assets/image/search-icon-sl7.png";
import userData from "../Profile/db.json"; // Assuming db.json is in the data folder
import "./Search.css"; // Import CSS file for Search component

const Search = ({ setResults }) => {
  const [searchText, setSearchText] = useState("");

  const fetchData = (value) => {
    fetch("/src/component/Profile/db.json")
      .then((response) => response.json())
      .then((json) => {
        const results = Object.values(json).filter((user) =>
          user.name.toLowerCase().includes(value.toLowerCase())
        );
        setResults(results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };  

  const handleChange = (value) => {
    setSearchText(value);
    fetchData(value);
  };

  return (
    <>
      <header className="header">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => handleChange(e.target.value)}
            className="search-in"
          />
          <button className="search-button">Search</button>
        </div>
      </header>
    </>
  );
};

export default Search;
