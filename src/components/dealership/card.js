import React, { useState, useEffect } from "react";
import DealershipManager from "../../api/dataManager";
import "./card.css"

import Modal from 'react-bootstrap/Modal';

import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const DealershipCard = props => {

  const [dealership, setDealership] = useState(props.dealership);

  const [show, setShow] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleEditMode = () => {
    setEditMode(!editMode)
  };

  const handleFieldChange = evt => {
    const stateToChange = {...dealership};
    stateToChange[evt.target.id] = evt.target.value;
    console.log(dealership)
    setDealership(stateToChange);
  };

  // const handleSubmit = () => {
  //   console.log(employee);

  //   if (employee.first_name === "" || employee.last_name === "") {
  //       window.alert("Please fill out employee name fields")
  //   } else if (employee.email_address === "") {
  //       window.alert("Please enter an email address")
  //   } else if (employee.phone === "") {
  //       window.alert("Please enter a phone number")
  //   } else if (employee.dealership_id === 0) {
  //       window.alert("Please select a valid dealership")
  //   } else if (employee.employee_type_id === 0) {
  //       window.alert("Please select a valid employee type")
  //   } else {
  //       EmployeeManager.update("employees", employee, employee.id)
  //           .then(() => {
  //             setEditMode(false)
  //           })
  //   }
  // } 

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
                />
              </Modal.Body>
              
              <Modal.Body className="fieldset">
                <label><strong>City:</strong></label> 
                <input 
                  type="text"
                  id="city"
                  onChange={handleFieldChange}
                  placeholder={dealership.city}
                />
              </Modal.Body>
              
              <Modal.Body className="fieldset">
                <label><strong>State:</strong></label> 
                <input 
                  type="text"
                  id="state"
                  onChange={handleFieldChange}
                  placeholder={dealership.state}
                />
              </Modal.Body>
              
              <Modal.Body className="fieldset">
                <label><strong>Phone Number:</strong></label> 
                <input 
                  type="text"
                  id="phone"
                  onChange={handleFieldChange}
                  placeholder={dealership.phone}
                />
              </Modal.Body>
              
              <Modal.Body className="fieldset">
                <label><strong>Website:</strong></label> 
                <input 
                  type="text"
                  id="website"
                  onChange={handleFieldChange}
                  placeholder={dealership.website}
                />
              </Modal.Body>
              
              <Modal.Body className="fieldset">
                <label><strong>Tax ID:</strong></label> 
                <input 
                  type="text"
                  id="tax_id"
                  onChange={handleFieldChange}
                  placeholder={dealership.tax_id}
                />
              </Modal.Body>

              <Modal.Body>
                  <button className="updateEmployee--btn">
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
