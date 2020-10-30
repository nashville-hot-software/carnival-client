import React, { useState, useEffect } from "react";
// import VehicleManager from "../../api/dataManager";
import "./card.css"


import Modal from 'react-bootstrap/Modal';
// import closeButton from 'react-bootstrap/closeButton';

const VehicleCard = props => {

  const [vehicle, setVehicle] = useState(props.vehicle);

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
        {/* <div onClick={() => props.history.push(`/vehicles/${vehicle.id}`)} className="vehicle-card--container"> */}
        <div onClick={() => handleShow()} className="vehicle-card--container">
            <h2 className="vehicle-card--name">{`${vehicle.vehicle_type.make} ${vehicle.vehicle_type.model}`}</h2>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Vehicle</Modal.Title>
          </Modal.Header>
          <Modal.Body>{`${vehicle.vehicle_type.make} ${vehicle.vehicle_type.model}`}</Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
    </>
  );
};

export default VehicleCard;
