import React, { useState } from "react";
import EmployeeManager from "../../api/dataManager";
import "./card.css"
import Modal from 'react-bootstrap/Modal';

const EmployeeCard = props => {

  const [employee, setEmployee] = useState(props.employee);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
        <div onClick={handleShow} className="employee-card--container">
            <h2 className="employee-card--name">{`${employee.first_name} ${employee.last_name}`}</h2>
        </div>

        <Modal centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body><strong>Name:</strong> {`${employee.first_name} ${employee.last_name}`}</Modal.Body>
          <Modal.Body><strong>Email:</strong> {`${employee.email_address}`}</Modal.Body>
          <Modal.Body><strong>Phone:</strong> {`${employee.phone}`}</Modal.Body>
          <Modal.Body><strong>Dealership:</strong> {`${employee.business_name}`}</Modal.Body>
          <Modal.Body><strong>Employee Type:</strong> {`${employee.employee_type}`}</Modal.Body>
        </Modal>
    </>
  );
};

export default EmployeeCard;
