import React, { useState, useEffect } from "react";
import VehicleCard from "./card";
import VehicleManager from "../../api/dataManager";
import "./list.css"

const Vehicles = props => {

  return (
    <>
      

      <div className="vehiclesContainer">
        {props.vehicles.slice(0,20).map(vehicle => {
          return (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              showVehiclesModal={props.showVehiclesModal}
              {...props}
            />
          );
        })}
      </div>
    </>
  );
};

export default Vehicles;


