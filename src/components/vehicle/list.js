import React, { useState, useEffect } from "react";
import VehicleCard from "./card";
import VehicleManager from "../../api/dataManager";
import "./list.css"

const Vehicles = props => {
//   const activeUser = props.activeUserId;

  const [vehicles, setVehicles] = useState([]);

  const getAllVehicles = () => {
    VehicleManager.getAll("vehicles",20).then(response => {
      setVehicles(response);
    });
  };

  useEffect(() => {
    getAllVehicles();
  }, []);

  return (
    <>
      <div className="vehiclesContainer">
        {vehicles.slice(0,20).map(vehicle => {
          return (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              getAllVehicles={getAllVehicles}
              {...props}
            />
          );
        })}
      </div>
    </>
  );
};

export default Vehicles;
