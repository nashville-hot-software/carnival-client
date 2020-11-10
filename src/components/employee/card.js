import React, { useState, useEffect } from "react";
import EmployeeManager from "../../api/dataManager";
import "./card.css"

import Modal from 'react-bootstrap/Modal';

import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const EmployeeCard = props => {

  const [employee, setEmployee] = useState(props.employee);
  const [dealerships, setDealerships] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);

  const [show, setShow] = useState(false);
  
  const [editMode, setEditMode] = useState(false);

  const fetchEmployeeTypes = () => {
    EmployeeManager.getAll("employeetypes")
      .then(employeeTypes => {
        setEmployeeTypes(employeeTypes);
    });
  }
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEditMode = () => {
    setEditMode(!editMode)
  };

  const handleFieldChange = evt => {
    const stateToChange = {...employee};
    stateToChange[evt.target.id] = evt.target.value;
    setEmployee(stateToChange);
  };

  const handleDealershipSearch = evt => {
    EmployeeManager.getAll("dealerships","searchTerm",evt.target.value)
      .then(matchedDealerships => {
        setDealerships(matchedDealerships);
    });
  }
  
  const handleDealerSelect = evt => {
    const stateToChange = {...employee}
    stateToChange.dealership_id = parseInt(evt.target.id)
    setEmployee(stateToChange)
  }
  
  const handleEmployeeTypeSelect = evt => {
    const stateToChange = {...employee}
    stateToChange.employee_type_id = parseInt(evt.target.value)
    setEmployee(stateToChange)
  }

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
      console.log("It worked!!")
        EmployeeManager.update("employees", employee, employee.id)
            .then(() => {
              setEditMode(false)
            })
    }
  } 

  useEffect(() => {
    fetchEmployeeTypes();
  }, [])

  return (
    <>
        <div onClick={handleShow} className="employee-card--container">
            <h2 className="employee-card--name">{`${employee.first_name} ${employee.last_name}`}</h2>
        </div>

        <Modal className="modal-details--form" show={show} onHide={handleClose}>
          <Modal.Header className="modalHeader" closeButton>
            <Modal.Title>Employee</Modal.Title>
          </Modal.Header>

          {editMode === false ? (
            <div className="modal-details--body">
              <Modal.Body className="fieldset"><strong>Name:</strong> {`${employee.first_name} ${employee.last_name}`}</Modal.Body>
              <Modal.Body className="fieldset"><strong>Email:</strong> {`${employee.email_address}`}</Modal.Body>
              <Modal.Body className="fieldset"><strong>Phone:</strong> {`${employee.phone}`}</Modal.Body>
              <Modal.Body className="fieldset"><strong>Dealership:</strong> {`${employee.business_name}`}</Modal.Body>
              <Modal.Body className="fieldset"><strong>Employee Type:</strong> {`${employee.employee_type}`}</Modal.Body>
            </div>
          ) : (
            <div className="modal-edit--body">
              <Modal.Body className="fieldset">
                <label><strong>First Name:</strong></label> 
                <input 
                  type="text"
                  id="first_name"
                  placeholder={`${employee.first_name}`}
                  onChange={handleFieldChange}
                />
              </Modal.Body>
              <Modal.Body className="fieldset">
                <label><strong>Last Name:</strong></label> 
                <input 
                  type="text"
                  id="last_name"
                  placeholder={`${employee.last_name}`}
                  onChange={handleFieldChange}
                />
              </Modal.Body>
              <Modal.Body className="fieldset">
                <label><strong>Email:</strong></label> 
                <input 
                  type="text"
                  id="email_address"
                  placeholder={`${employee.email_address}`}
                  onChange={handleFieldChange}
                />
              </Modal.Body>
              <Modal.Body className="fieldset">
                <label><strong>Phone:</strong></label> 
                <input 
                  type="text"
                  id="phone"
                  placeholder={`${employee.phone}`}
                  onChange={handleFieldChange}
                />
              </Modal.Body>
              {/* <Modal.Body className="fieldset">
                <label><strong>Dealership:</strong></label> 
                <input 
                  type="text"
                  placeholder={`${employee.business_name}`}
                  onChange={handleFieldChange}
                />
              </Modal.Body> */}

              <Modal.Body className="fieldset">
                  <label className="name--label">Dealership:</label>
                  <input 
                    type="text" 
                    className="modal--input" 
                    onChange={handleDealershipSearch} 
                    placeholder={`${employee.business_name}`} 
                  />
                  
                  {dealerships !== undefined && dealerships.length > 0 ? (
                      <div className="dealership--dropdown">
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
              </Modal.Body>

              {employeeTypes !== undefined ? (
                  <Modal.Body className="fieldset">
                      <label className="name--label">Employee Type:</label>
                      <select 
                          id="employee_type_id" 
                          onChange={handleEmployeeTypeSelect}
                      >
                          <option defaultValue={employee.employee_type}>{employee.employee_type}</option>
                          {employeeTypes.map(type => {
                              return (
                                  <option value={type.id}>
                                      {type.name}
                                  </option>
                              )
                          })}
                      </select>
                  </Modal.Body>
              ) : null}

              <Modal.Body>
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
