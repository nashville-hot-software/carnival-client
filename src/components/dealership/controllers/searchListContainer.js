import React, { useState, useEffect } from "react";
import DealershipManager from "../../../api/dataManager";
import "../../../styles/dealerships/list.css"
import ModalWrapper from "../../modal/modalWrapper"
import { modal } from "../../../modules/modal/helpers"
import SearchList from "../views/searchList"

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
    modal.handleDetailsShow(setDealershipDeleted);
    
    const foundDealership = dealerships.filter(filteredDealership => filteredDealership.id === dealership.id);
    setFilteredDealership(foundDealership[0]);
  }

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

      <SearchList 
        handleDealershipSearch={handleDealershipSearch}
        dealerships={dealerships}
        showDetailsModal={showDetailsModal}
        setCreationView={setCreationView}
      />
    </>
  );
};

export default Dealerships;
