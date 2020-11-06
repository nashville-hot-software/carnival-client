import React, { useState } from "react";

const VehicleTypeCard = props => {

  const [vehicletype, setEmployee] = useState(props.vehicletype);

  return (
    <>
        <div className="vehicletype-card--container">
            <h2 className="vehicletype-card--name">{`${vehicletype.make} ${vehicletype.model}`}</h2>
        </div>
    </>
  );
};

export default VehicleTypeCard;
