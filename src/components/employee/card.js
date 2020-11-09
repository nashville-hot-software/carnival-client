import React, { useState } from "react";
import EmployeeManager from "../../api/dataManager";
import "./card.css"

import Modal from 'react-bootstrap/Modal';

import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const EmployeeCard = props => {

  const [employee, setEmployee] = useState(props.employee);

  const [show, setShow] = useState(false);
  
  const [editMode, setEditMode] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEditMode = () => {
    setEditMode(!editMode)
  };

  const handleFieldChange = evt => {
    const updatedEmployee = {...employee};
    updatedEmployee[evt.target.id] = evt.target.value;
    // console.log(updatedEmployee)
  };

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
                  // onChange={handleFieldChange}
                />
              </Modal.Body>
              <Modal.Body className="fieldset">
                <label><strong>Phone:</strong></label> 
                <input 
                  type="text"
                  id="phone"
                  placeholder={`${employee.phone}`}
                  // onChange={handleFieldChange}
                />
              </Modal.Body>
              <Modal.Body className="fieldset">
                <label><strong>Dealership:</strong></label> 
                <input 
                  type="text"
                  placeholder={`${employee.business_name}`}
                  // onChange={handleFieldChange}
                />
              </Modal.Body>
              <Modal.Body className="fieldset">
                <label><strong>Employee Type:</strong></label> 
                <input 
                  type="text"
                  placeholder={`${employee.employee_type}`}
                  // onChange={handleFieldChange}
                />
              </Modal.Body>
            </div>
          )}

          <div className="edit--switch">
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
              <FormControlLabel
                onClick={handleEditMode}
                value="Edit"
                control={<Switch color="primary" />}
                label="Edit"
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
