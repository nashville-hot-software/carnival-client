import React, { useState, useEffect } from "react";
import DealershipCard from "./card";
import DealershipManager from "../../api/dataManager";
import "./list.css"
import ModalWrapper from "../modal/modalWrapper"


const Dealerships = props => {

  const [dealerships, setDealerships] = useState([]);
  const [filteredDealership, setFilteredDealership] = useState();
  const [creationView, setCreationView] = useState(false);

  const handleDealershipSearch = evt => {
    DealershipManager.getAll("dealerships","searchTerm",evt.target.value)
      .then(matchedDealerships => {
        setDealerships(matchedDealerships);
    });
  }

  // Runs when you click on dealership card for details
  const showDetailsModal = dealership => {
    const foundDealership = dealerships.filter(filteredDealership => filteredDealership.id === dealership.id);

    console.log(foundDealership)

    // document.querySelector(".modal-box").classList.remove("fade-out");
    // document.querySelector(".modal-bg").classList.remove("fade-out");
    document.querySelector(".modal-box").classList.add("show");
    document.querySelector(".modal-bg").classList.add("show");

    setFilteredDealership(foundDealership[0]);
  }

  // Runs when click add dealership button
  const handleShow = () => {
    setCreationView(true)

    document.querySelector(".modal-box").classList.remove("fade-out");
    document.querySelector(".modal-bg").classList.remove("fade-out");
    document.querySelector(".modal-box").classList.add("show");
    document.querySelector(".modal-bg").classList.add("show");
  };

  return (
    <>
      <ModalWrapper 
          filteredDealership={filteredDealership} 
          setFilteredDealership={setFilteredDealership}
          setCreationView={setCreationView}
          dealershipCreationView={creationView}
          {...props}
      />

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
            <div className="searchResults dealerships">
              {dealerships.map(dealership => {
                return (
                  <DealershipCard
                    key={dealership.id}
                    dealership={dealership}
                    showDetailsModal={showDetailsModal}
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
