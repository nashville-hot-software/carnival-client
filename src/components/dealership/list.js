import React, { useState, useEffect } from "react";
import DealershipCard from "./card";
import DealershipManager from "../../api/dataManager";
import "./list.css"
import Modal from 'react-bootstrap/Modal';
import ModalWrapper from "../modal/modalWrapper"


const Dealerships = props => {

  const [dealerships, setDealerships] = useState([]);
  const [filteredDealership, setFilteredDealership] = useState();
  const [creationView, setCreationView] = useState(false);
  const [newDealership, setNewDealership] = useState({
    business_name: "",
    city: "",
    state: "",
    phone: "",
    website: "",
    tax_id: ""
  })

  const handleDealershipSearch = evt => {
    DealershipManager.getAll("dealerships","searchTerm",evt.target.value)
      .then(matchedDealerships => {
        setDealerships(matchedDealerships);
    });
  }

  // Below 3 are for Modal
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  
  const handleInputFieldChange = evt => {
    const stateToChange = {...newDealership}
    stateToChange[evt.target.id] = evt.target.value
    console.log(stateToChange)
    setNewDealership(stateToChange)
  }


  // Runs when you click on dealership card for details
  const showDetailsModal = dealership => {
    const foundDealership = dealerships.filter(filteredDealership => filteredDealership.id === dealership.id);

    console.log(foundDealership)

    // document.querySelector(".modal-box").classList.remove("fade-out");
    // document.querySelector(".modal-bg").classList.remove("fade-out");
    document.querySelector(".modal-box").classList.add("show");
    document.querySelector(".modal-bg").classList.add("show");

    // NOTE: thinking if we can get editModal useEffect to watch for this to update when
    // different employee is clicked, that could re-render the modal correctly....
    setFilteredDealership(foundDealership[0]);
  }

  const handleShow = () => {
    setCreationView(true)

    document.querySelector(".modal-box").classList.remove("fade-out");
    document.querySelector(".modal-bg").classList.remove("fade-out");
    document.querySelector(".modal-box").classList.add("show");
    document.querySelector(".modal-bg").classList.add("show");
  };

  const handleSubmit = () => {
    if (newDealership.business_name === "") {
        window.alert("Please enter a dealership name")
    } else if (newDealership.city === "") {
        window.alert("Please enter city")
    } else if (newDealership.state === "") {
        window.alert("Please enter a state")
    } else if (newDealership.phone === "") {
        window.alert("Please enter a phone number for new dealership")
    } else if (newDealership.website === "") {
        window.alert("Please enter a website for new dealership")
    } else if (newDealership.tax_id === "") {
      window.alert("Please enter a tax id for new dealership")
    } else {
        DealershipManager.PostData("dealerships", newDealership)
            // .then(() => setShow(false))
    }
  } 

  return (
    <>
      <ModalWrapper 
          filteredDealership={filteredDealership} 
          setFilteredDealership={setFilteredDealership}
          setCreationView={setCreationView}
          creationView={creationView}
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
            <div className="searchResults">
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

            {/* <Modal className="modal--form" show={show} onHide={handleClose}>
                <Modal.Header className="modalHeader" closeButton>
                    <Modal.Title>Add Dealership</Modal.Title>
                </Modal.Header>
                <div className="modalBody">
                    <Modal.Body className="fieldset">
                        <label className="name--label">Dealership Name:</label>
                        <input onChange={handleInputFieldChange} id="business_name" className="modal--input" type="text"/>

                        <label className="name--label">City:</label>
                        <input onChange={handleInputFieldChange} id="city" className="modal--input" type="text"/>

                        <label className="name--label">State:</label>
                        <input onChange={handleInputFieldChange} id="state" className="modal--input" type="text"/>

                        <label className="name--label">Phone:</label>
                        <input onChange={handleInputFieldChange} id="phone" className="modal--input" type="text"/>

                        <label className="name--label">Website:</label>
                        <input onChange={handleInputFieldChange} id="website" className="modal--input" type="text"/>

                        <label className="name--label">Tax ID:</label>
                        <input onChange={handleInputFieldChange} id="tax_id" className="modal--input" type="text"/>

                        <button onClick={handleSubmit} className="modal--addBtn addEmployee--btn">
                            Submit
                        </button>
                    </Modal.Body>
                </div>
            </Modal> */}
        </div>
      </div>
    </>
  );
};

export default Dealerships;
