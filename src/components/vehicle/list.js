import React, { useState, useEffect } from "react";
import VehicleCard from "./card";
import VehicleManager from "../../api/dataManager";
import "./list.css"
import ModalWrapper from "../modal/modalWrapper"

const Vehicles = props => {
//   const activeUser = props.activeUserId;

  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicle, setFilteredVehicle] = useState([]);
  
  const getAllVehicles = () => {
    VehicleManager.getAll("vehicles","popular_models","True")
      .then(response => {
        console.log(response)
        setVehicles(response);
      });
  };

  const showVehiclesModal = vehicle => {
    const foundVehicle = vehicles.filter(matchedVehicle => matchedVehicle.id === vehicle.id);
    console.log(foundVehicle[0])
    setFilteredVehicle(foundVehicle[0]);

    document.querySelector(".modal-box").classList.add("show");
    document.querySelector(".modal-bg").classList.add("show");
  }

  useEffect(() => {
    getAllVehicles();
  }, []);

  return (
    <>
      <ModalWrapper 
        filteredVehicle={filteredVehicle}
      />

      <div className="vehiclesContainer">
        {vehicles.slice(0,20).map(vehicle => {
          return (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              getAllVehicles={getAllVehicles}
              showVehiclesModal={showVehiclesModal}
              {...props}
            />
          );
        })}
      </div>
    </>
  );
};

export default Vehicles;


