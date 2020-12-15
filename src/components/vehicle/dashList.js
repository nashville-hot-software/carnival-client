import React from "react";
import VehicleCard from "./dashboardCard";
import "../../styles/vehicles/dashList.css"

const Vehicles = props => {

  return (
    <>
      <div className="vehiclesContainer">
        {props.vehicles.slice(0,20).map(vehicle => {
          return (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              showDetailsModal={props.showDetailsModal}
              setFilteredVehicle={props.setFilteredVehicle}
              vehicles={props.vehicles} 
              {...props}
            />
          );
        })}
      </div>
    </>
  );
};

export default Vehicles;


