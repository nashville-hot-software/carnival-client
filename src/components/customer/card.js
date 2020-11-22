import React, { useState, useEffect } from "react";
import CustomerManager from "../../api/dataManager";
import "./card.css"

import Modal from 'react-bootstrap/Modal';

const CustomerCard = props => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

//   const deleteFriend = friendId => {
//     if (window.confirm(`Are you sure you want to delete ${user.user.first_name + " " + user.user.last_name} as a friend?`)) {
//       FriendsManager.deleteFriend(friendId).then(() => {
//         props.getAllFriends();
//       });
//     }
//   };

  return (
    <>
        <div onClick={() => props.showCustomersModal(props.customer)} className="customer-card--container">
          <h2 className="customer-card--name">{`${props.customer.customer.first_name} ${props.customer.customer.last_name}`}</h2>
          <p className="customer-card--saleInvoice"><span className="label">Invoice:</span> {`#${props.customer.invoice_number}`}</p>
        </div>

        {/* <Modal centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body><strong>Name:</strong> {`${props.customer.customer.first_name} ${props.customer.customer.last_name}`}</Modal.Body>
          <Modal.Body><strong>Email:</strong> {props.customer.customer.email}</Modal.Body>
          <Modal.Body><strong>Phone:</strong> {props.customer.customer.phone}</Modal.Body>
        </Modal> */}
    </>
  );
};

export default CustomerCard;
