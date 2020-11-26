import React, { useEffect } from "react";
import "./searchCard.css"
import NumberFormat from 'react-number-format';

const VehicleCard = props => {

  useEffect(() => {
    console.log(props.vehicle)
  }, [])

  return (
    <>
        <div onClick={() => props.showDetailsModal(props.vehicle)} className="vehicle-searchCard--container">
            <h2 className="vehicle-card--name">
              {`${props.vehicle.make} ${props.vehicle.model}`}
            </h2>
            <span>
              {`Exterior: ${props.vehicle.exterior_color}, Interior: ${props.vehicle.interior_color}`}
            </span>
            <span>
              <NumberFormat value={props.vehicle.floor_price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </span>
        </div>
    </>
  );
};

export default VehicleCard;
