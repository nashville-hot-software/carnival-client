import React, { useEffect } from "react";
import "../../styles/vehicles/searchCard.css"
import NumberFormat from 'react-number-format';

const VehicleCard = props => {

  return (
    <>
        <div onClick={() => props.showDetailsModal(props.vehicle)} className="vehicle-searchCard--container">
            <h2 className="vehicle-card--name search">
              {`${props.vehicle.make} ${props.vehicle.model}`}
            </h2>
            <span>
              Floor Price: <NumberFormat value={props.vehicle.floor_price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </span>
            <span>
              {`Exterior Color: ${props.vehicle.exterior_color}, Interior Color: ${props.vehicle.interior_color}`}
            </span>
            <span>
              Mileage: {props.vehicle.miles_count}
            </span>
        </div>
    </>
  );
};

export default VehicleCard;
