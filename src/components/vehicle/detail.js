import React, { useState, useEffect } from "react";
import VehicleManager from "../../api/dataManager";
import "../../styles/vehicles/detail.css"

const VehicleDetails = props => {

  const [vehicle, setVehicle] = useState();

  const getVehicle = () => {
      VehicleManager.getOne("vehicles", props.vehicleId)
        .then(response => {
            setVehicle(response)
        })
  }

//   const deleteFriend = friendId => {
//     if (window.confirm(`Are you sure you want to delete ${user.user.first_name + " " + user.user.last_name} as a friend?`)) {
//       FriendsManager.deleteFriend(friendId).then(() => {
//         props.getAllFriends();
//       });
//     }
//   };

  useEffect(() => {
    getVehicle();
  }, []);

  return (
    <>
        {vehicle !== undefined ? (
            <div className="vehicle-details--container">
                <h2 className="vehicle-details--make">{`${vehicle.year_of_car} ${vehicle.vehicle_type.make} ${vehicle.vehicle_type.model}`}</h2>
                <p className="vehicle-details--msrprice"><strong>MSR Price:</strong> ${`${vehicle.msr_price}`}</p>
                <p className="vehicle-details--floorprice"><strong>Floor Price:</strong> ${`${vehicle.floor_price}`}</p>
                <p className="vehicle-details--mileage"><strong>Mileage:</strong> {`${vehicle.miles_count}`}</p>
                <p className="vehicle-details--engine"><strong>Engine Type:</strong> {`${vehicle.engine_type}`}</p>
                <p className="vehicle-details--exteriorcolor"><strong>Exterior Color:</strong> {`${vehicle.exterior_color}`}</p>
                <p className="vehicle-details--interiorcolor"><strong>Interior Color:</strong> {`${vehicle.interior_color}`}</p>
            </div>
        ) : null}
    </>
  );
};

export default VehicleDetails;
