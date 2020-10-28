import React, { useState, useEffect } from "react";
import VehicleManager from "../../api/dataManager";
import "./card.css"

const VehicleCard = props => {

  const [vehicle, setVehicle] = useState(props.vehicle);

//   const deleteFriend = friendId => {
//     if (window.confirm(`Are you sure you want to delete ${user.user.first_name + " " + user.user.last_name} as a friend?`)) {
//       FriendsManager.deleteFriend(friendId).then(() => {
//         props.getAllFriends();
//       });
//     }
//   };

  return (
    <>
        <div onClick={() => props.history.push(`/vehicles/${vehicle.id}`)} className="vehicle-card--container">
            <h2 className="vehicle-card--name">{`${vehicle.engine_type}`}</h2>
        </div>
    </>
  );
};

export default VehicleCard;
