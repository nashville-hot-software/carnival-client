import React, { useState, useEffect } from "react";
import CustomerManager from "../../api/dataManager";
import "./card.css"

import Modal from 'react-bootstrap/Modal';

const CustomerCard = props => {

  const [customer, setCustomer] = useState(props.customer);

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
        <div onClick={() => handleShow()} className="customer-card--container">
          <h2 className="customer-card--name">{`${customer.customer.first_name} ${customer.customer.last_name}`}</h2>
          <p className="customer-card--saleInvoice">{`Invoice: #${customer.invoice_number}`}</p>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>{`${customer.customer.first_name} ${customer.customer.last_name}`}</Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
    </>
  );
};

export default CustomerCard;
