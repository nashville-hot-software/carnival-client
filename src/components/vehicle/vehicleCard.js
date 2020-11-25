import React from "react";

const VehicleCard = props => {

  return (
    <>
        <div onClick={() => props.showDetailsModal(props.vehicle)}>
            <h2 className="vehicle-card--name">
              {`${props.vehicle.make} ${props.vehicle.model}`}
            </h2>
        </div>
    </>
  );
};

export default VehicleCard;
