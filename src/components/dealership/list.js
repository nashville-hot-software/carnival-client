import React, { useState, useEffect } from "react";
import DealershipCard from "./card";
import DealershipManager from "../../api/dataManager";
import "../../styles/dealerships/list.css"
import ModalWrapper from "../modal/modalWrapper"


const Dealerships = props => {

  const [dealerships, setDealerships] = useState([]);
  const [filteredDealership, setFilteredDealership] = useState();
  const [creationView, setCreationView] = useState(false);
  
  // below 3 states are for useEffect to re-render search page with user's query
  // to reflect realtime updates/deletes from the modal form
  const [editMode, setEditMode] = useState(false);
  const [dealershipDeleted, setDealershipDeleted] = useState(false);
  const [query, setQuery] = useState();

  const handleDealershipSearch = evt => {
    if (evt.target.value.length > 0) {
      setQuery(evt.target.value);

      DealershipManager.getAll("dealerships","searchTerm",evt.target.value)
        .then(matchedDealerships => {
          setDealerships(matchedDealerships);
      });
    }
  }

  const showDetailsModal = dealership => {
    // so we can reset state to watch for n deletes after the first delete
    setDealershipDeleted(false);

    const foundDealership = dealerships.filter(filteredDealership => filteredDealership.id === dealership.id);

    document.querySelector(".modal-box").classList.add("show");
    document.querySelector(".modal-bg").classList.add("show");

    setFilteredDealership(foundDealership[0]);
  }

  // Runs when click add dealership button
  const handleShow = () => {
    setCreationView(true)

    document.querySelector(".modal-box").classList.add("show");
    document.querySelector(".modal-bg").classList.add("show");
  };

    // this reflects the dealership update in the search list realtime by re-searching for the
    // dealership when edit mode switched off
    useEffect(() => {
      DealershipManager.getAll("dealerships","searchTerm",query)
      .then(matchedDealerships => {
        setDealerships(matchedDealerships);
      });
    }, [editMode, dealershipDeleted])

  return (
    <>
      <ModalWrapper 
          filteredDealership={filteredDealership} 
          setFilteredDealership={setFilteredDealership}
          setCreationView={setCreationView}
          dealershipCreationView={creationView}
          editMode={editMode}
          setEditMode={setEditMode}
          setDealershipDeleted={setDealershipDeleted}
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
