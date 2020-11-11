import React, { useState, useEffect } from "react";
import DealershipManager from "../../api/dataManager";
import "./card.css"

import Modal from 'react-bootstrap/Modal';

import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const DealershipCard = props => {

  // Dealership obj to update, coming from parent dealership list map
  const [dealership, setDealership] = useState(props.dealership);

  // State to hide/show the modal
  const [show, setShow] = useState(false);

  // State for modal edit mode on MUI switch click
  const [editMode, setEditMode] = useState(false);

  // Handle opening/closing of modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  // Updates modal edit state to engage edit mode on MUI switch click
  const handleEditMode = () => {
    setEditMode(!editMode)
  };

  // Update dealership state obj on new input field values entered
  const handleFieldChange = evt => {
    const stateToChange = {...dealership};
    stateToChange[evt.target.id] = evt.target.value;
    setDealership(stateToChange);
  };

  // Submit a PUT request with updated dealership state obj if all form
  // condtions are met
  const handleSubmit = () => {
    if (dealership.business_name === "") {
        window.alert("Please fill out dealership name fields")
    } else if (dealership.city === "") {
        window.alert("Please enter a city")
    } else if (dealership.state === "") {
        window.alert("Please enter a state")
    } else if (dealership.phone === "") {
        window.alert("Please enter a phone number")
    } else if (dealership.website === "") {
        window.alert("Please enter a website")
    } else if (dealership.tax_id === "") {
        window.alert("Please enter a tax ID")
    } else {
        DealershipManager.update("dealerships", dealership, dealership.id)
            .then(() => {
              setEditMode(false)
            })
    }
  } 

  return (
    <>
        <div onClick={handleShow} className="dealership-card--container">
            <h2 className="dealership-card--name">{`${dealership.business_name}`}</h2>
        </div>

        <Modal className="modal-details--form" show={show} onHide={handleClose}>
          <Modal.Header className="modalHeader" closeButton>
            <Modal.Title>Dealership</Modal.Title>
          </Modal.Header>

          {editMode === false ? (
            <div className="modal-details--body">
              <Modal.Body className="fieldset"><strong>Dealership Name:</strong> {`${dealership.business_name}`}</Modal.Body>
              <Modal.Body className="fieldset"><strong>Location:</strong> {`${dealership.city}, ${dealership.state}`}</Modal.Body>
              <Modal.Body className="fieldset"><strong>Phone:</strong> {`${dealership.phone}`}</Modal.Body>
              <Modal.Body className="fieldset"><strong>Website:</strong> {`${dealership.website}`}</Modal.Body>
              <Modal.Body className="fieldset"><strong>Tax ID:</strong> {`${dealership.tax_id}`}</Modal.Body>
            </div>
          ) : (
            <div className="modal-edit--body">
                <Modal.Body className="fieldset">
                  <label><strong>Dealership Name:</strong></label> 
                  <input 
                    type="text"
                    id="business_name"
                    onChange={handleFieldChange}
                    placeholder={dealership.business_name}
                    className="inputField"
                  />
                
                
                  <label><strong>City:</strong></label> 
                  <input 
                    type="text"
                    id="city"
                    onChange={handleFieldChange}
                    placeholder={dealership.city}
                    className="inputField"
                  />
                
                
                  <label><strong>State:</strong></label> 
                  <input 
                    type="text"
                    id="state"
                    onChange={handleFieldChange}
                    placeholder={dealership.state}
                    className="inputField"
                  />
                
                
                  <label><strong>Phone Number:</strong></label> 
                  <input 
                    type="text"
                    id="phone"
                    onChange={handleFieldChange}
                    placeholder={dealership.phone}
                    className="inputField"
                  />
                
                
                  <label><strong>Website:</strong></label> 
                  <input 
                    type="text"
                    id="website"
                    onChange={handleFieldChange}
                    placeholder={dealership.website}
                    className="inputField"
                  />
                
                
                  <label><strong>Tax ID:</strong></label> 
                  <input 
                    type="text"
                    id="tax_id"
                    onChange={handleFieldChange}
                    placeholder={dealership.tax_id}
                    className="inputField"
                  />

                  <button onClick={handleSubmit} className="updateEmployee--btn">
                      Update
                  </button>
              </Modal.Body>
            </div>
          )}

          <div className="edit--switch">
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
              <FormControlLabel
                
                value="Edit"
                control={<Switch onClick={handleEditMode} color="primary" />}
                label="Update"
                labelPlacement="top"
              />
              </FormGroup>
            </FormControl>
          </div>
        </Modal>
    </>
  );
};

export default DealershipCard;
