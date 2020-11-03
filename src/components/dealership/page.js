import React, { useState, useEffect } from "react";
import DealershipManager from "../../api/dataManager";
import Dealerships from "./list";
import DealershipCard from "./card"
import Modal from 'react-bootstrap/Modal';
import "./card.css"

const DealershipPage = props => {

const dealerships = [
    "Siri",
    "Alexa",
    "Google",
    "Facebook",
    "Twitter",
    "Linkedin",
    "Sinkedin"
  ];
  
   const [searchTerm, setSearchTerm] = React.useState("");
   const [searchResults, setSearchResults] = React.useState([]);
   const handleChange = event => {
      setSearchTerm(event.target.value);
    };
   React.useEffect(() => {
      const results = dealerships.filter(person =>
        person.toLowerCase().includes(searchTerm)
      );
      setSearchResults(results);
    }, [searchTerm]);
  
    return (
      <div className="App">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
        />
        <ul>
           {searchResults.map(item => (
            <li>{item}</li>
          ))}
        </ul>
      </div>
    );
  }

export default DealershipPage