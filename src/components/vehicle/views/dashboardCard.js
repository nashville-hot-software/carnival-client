import React, { useState } from "react";
import "../../../styles/vehicles/card.css"

const VehicleCard = props => {

  const [vehicle, setVehicle] = useState(props.vehicle);

  return (
    <>
        <div 
          onClick={() => props.showDetailsModal(vehicle, props.vehicles, props.setFilteredVehicle)} 
          className="vehicle-card--container"
        >
            <h2 className="vehicle-card--name">{`${vehicle.make} ${vehicle.model}`}</h2>
            <p className="vehicle-card--numberSold"><span className="label">Vehicles Sold:</span> {`${vehicle.vehicles_sold}`}</p>
        </div>
    </>
  );
};

export default VehicleCard;
