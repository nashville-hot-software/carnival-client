import React, { useState } from "react";

const VehicleTypeCard = props => {

  // const [vehicletype, setEmployee] = useState(props.vehicletype);

  return (
    <>
        <div className="vehicletype-card--container">
            <h2 className="vehicletype-card--name">{`${props.vehicletype.make} ${props.vehicletype.model}`}</h2>
        </div>
    </>
  );
};

export default VehicleTypeCard;
