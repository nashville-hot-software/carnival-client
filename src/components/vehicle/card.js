import React, { useState, useEffect } from "react";
import "./card.css"

const VehicleCard = props => {

  const [vehicle, setVehicle] = useState(props.vehicle);

  return (
    <>
        <div onClick={() => props.showVehiclesModal(vehicle)} className="vehicle-card--container">
            <h2 className="vehicle-card--name">{`${vehicle.make} ${vehicle.model}`}</h2>
            <p className="vehicle-card--numberSold"><span className="label">Vehicles Sold:</span> {`${vehicle.vehicles_sold}`}</p>
        </div>
    </>
  );
};

export default VehicleCard;
