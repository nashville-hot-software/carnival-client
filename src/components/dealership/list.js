import React, { useState, useEffect } from "react";
import DealershipCard from "./card";
import DealershipManager from "../../api/dataManager";
import "./list.css"


const Dealerships = props => {

  const [dealerships, setDealerships] = useState([]);

  const handleDealershipSearch = evt => {
    DealershipManager.getAll("dealerships","searchTerm",evt.target.value)
      .then(matchedDealerships => {
        setDealerships(matchedDealerships);
    });
  }

  // Below 3 are for Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="dealerships--container">
        <div className="dealerships--subContainer">
          <div className="dealership--header">Dealerships</div>

          <input 
            type='text' 
            className="dealerships-searchBar" 
            onChange={handleDealershipSearch} 
            placeholder="Search for Dealerships" 
          />
          
          {dealerships !== undefined ? (
            <div className="searchResults">
              {dealerships.map(dealership => {
                return (
                  <DealershipCard
                    key={dealership.id}
                    dealership={dealership}
                    {...props}
                  />
                );
              })}
            </div>
          ) : null}

            <button onClick={() => handleShow()} className="addDealership--btn">
                Add New Dealership
            </button>
        </div>
      </div>
    </>
  );
};

export default Dealerships;
