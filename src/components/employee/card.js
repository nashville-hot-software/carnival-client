import React, { useState, useEffect } from "react";
import EmployeeManager from "../../api/dataManager";
import "./card.css"

import Modal from 'react-bootstrap/Modal';

import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const EmployeeCard = props => {

  // employee obj to update (passed down from parent list component)
  const [employee, setEmployee] = useState({
    "first_name": props.employee.first_name,
    "last_name": props.employee.last_name,
    "email_address": props.employee.email_address,
    "phone": props.employee.phone,
    "dealership_id": props.employee.dealership_id,
    "employee_type_id": props.employee.employee_type_id
  });

  // populating the dealership select dropdown
  const [dealerships, setDealerships] = useState([]);

  // populating the employee types select dropdown
  const [employeeTypes, setEmployeeTypes] = useState([]);

  // State for modal show/close
  const [show, setShow] = useState(false);

  const [open, setOpen] = useState(false);

  // State for modal edit mode
  const [editMode, setEditMode] = useState(false);

 
  // Open / close the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Turn on edit mode with MUI switch 
  const handleEditMode = () => {
    fetchEmployeeTypes();
    setEditMode(!editMode)
  };

  // (For edit mode) Update employee object as new values entered in input fields
  const handleFieldChange = evt => {
    const stateToChange = {...employee};
    stateToChange[evt.target.id] = evt.target.value;
    setEmployee(stateToChange);
  };

  // Fetches dealerships for the dropdown menu to select a new dealership
  const handleDealershipSearch = evt => {
    if (evt.target.value.length > 0) {
      EmployeeManager.getAll("dealerships","searchTerm",evt.target.value)
        .then(matchedDealerships => {
          setDealerships(matchedDealerships);
      });

      setOpen(true);
    } else {
      setDealerships([]);

      setOpen(false);
    }
  }
  
  // Update employee obj with new dealership selected from expanded dropdown
  const handleDealerSelect = evt => {
    const stateToChange = {...employee}
    stateToChange.dealership_id = parseInt(evt.target.id)
    setEmployee(stateToChange)
  }

  // Fetch all employee types for the select menu in modal edit form
  const fetchEmployeeTypes = () => {
    EmployeeManager.getAll("employeetypes")
      .then(employeeTypes => {
        setEmployeeTypes(employeeTypes);
    });
  }

  // Update employee obj with new employee type selected from select menu
  const handleEmployeeTypeSelect = evt => {
    const stateToChange = {...employee}
    stateToChange.employee_type_id = parseInt(evt.target.value)
    setEmployee(stateToChange)
  }

  // Submits PUT req if all conditions from the form are met
  const handleSubmit = () => {
    console.log(employee);

    if (employee.first_name === "" || employee.last_name === "") {
        window.alert("Please fill out employee name fields")
    } else if (employee.email_address === "") {
        window.alert("Please enter an email address")
    } else if (employee.phone === "") {
        window.alert("Please enter a phone number")
    } else if (employee.dealership_id === 0) {
        window.alert("Please select a valid dealership")
    } else if (employee.employee_type_id === 0) {
        window.alert("Please select a valid employee type")
    } else {
        EmployeeManager.update("employees", employee, props.employee.id)
            .then(() => {
              setEditMode(false)
            })
    }
  } 

  return (
    <>
        <div onClick={handleShow} className="employee-card--container">
            <h2 className="employee-card--name">{`${props.employee.first_name} ${props.employee.last_name}`}</h2>
        </div>

        <Modal className="modal-details--form" show={show} onHide={handleClose}>
          <Modal.Header className="modalHeader" closeButton>
            <Modal.Title>Employee</Modal.Title>
          </Modal.Header>

          {editMode === false ? (
            <div className="modal-details--body">
              <Modal.Body className="fieldset"><strong>Name:</strong> {`${props.employee.first_name} ${props.employee.last_name}`}</Modal.Body>
              <Modal.Body className="fieldset"><strong>Email:</strong> {`${props.employee.email_address}`}</Modal.Body>
              <Modal.Body className="fieldset"><strong>Phone:</strong> {`${props.employee.phone}`}</Modal.Body>
              <Modal.Body className="fieldset"><strong>Dealership:</strong> {`${props.employee.business_name}`}</Modal.Body>
              <Modal.Body className="fieldset"><strong>Employee Type:</strong> {`${props.employee.employee_type}`}</Modal.Body>
            </div>
          ) : (
            <div className="modal-edit--body">
              <Modal.Body className="fieldset">
                <label><strong>First Name:</strong></label> 
                <input 
                  type="text"
                  id="first_name"
                  placeholder={`${props.employee.first_name}`}
                  onChange={handleFieldChange}
                  className="inputField"
                />
              
              
                <label><strong>Last Name:</strong></label> 
                <input 
                  type="text"
                  id="last_name"
                  placeholder={`${props.employee.last_name}`}
                  onChange={handleFieldChange}
                  className="inputField"
                />
              
              
                <label><strong>Email:</strong></label> 
                <input 
                  type="text"
                  id="email_address"
                  placeholder={`${props.employee.email_address}`}
                  onChange={handleFieldChange}
                  className="inputField"
                />
              
              
                  <label><strong>Phone:</strong></label> 
                  <input 
                    type="text"
                    id="phone"
                    placeholder={`${props.employee.phone}`}
                    onChange={handleFieldChange}
                    className="inputField"
                  />
              
                  <label className="name--label dealership--label">Dealership:</label>
                  <div className={`dealership-list--dropdown ${open ? 'open' : ''}`}>
                    <input 
                      type="text" 
                      className="dealership--search" 
                      onChange={handleDealershipSearch} 
                      placeholder={`${props.employee.business_name}`} 
                    />
                    
                    {dealerships !== undefined && dealerships.length > 0 ? (
                      <div className="dealerships-results--container">
                            {dealerships.map(dealership => {
                                return (
                                <>
                                    <div 
                                        className="dealership--select"
                                        id={dealership.id}
                                        onClick={handleDealerSelect}  
                                    >
                                        {dealership.business_name}
                                    </div>
                                </>
                                )
                            })}
                      </div>
                    ) : null}
                  </div>
              

                  {employeeTypes !== undefined ? (
                      <>
                          <label className="employeeType--label">Employee Type:</label>
                          <select 
                              id="employee_type_id" 
                              onChange={handleEmployeeTypeSelect}
                              className="employeeType--select"
                          >
                            <option defaultValue={props.employee.employee_type}>{props.employee.employee_type}</option>
                              {employeeTypes.map(type => {
                                  return (
                                      <option value={type.id}>
                                          {type.name}
                                      </option>
                                  )
                              })}
                          </select>
                        </>
                  ) : null}

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

export default EmployeeCard;
