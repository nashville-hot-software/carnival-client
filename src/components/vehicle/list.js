import React, { useState, useEffect } from "react";
import VehicleCard from "./vehicleCard"
import VehicleManager from "../../api/dataManager";
import "./list.css"
import ModalWrapper from "../modal/modalWrapper"


const VehiclesList = props => {

  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicle, setFilteredVehicle] = useState();
  const [creationView, setCreationView] = useState(false);

  const handleVehicleSearch = evt => {
    if (evt.target.value.length > 0) {
        VehicleManager.getAll("vehicles","vehicle",evt.target.value)
          .then(matchedVehicles => {
            setVehicles(matchedVehicles);
        });
    } else {
      setVehicles([])
    }
  }

  // Runs when you click on dealership card for details
  const showDetailsModal = vehicle => {
    const foundVehicle = vehicles.filter(filteredVehicle => filteredVehicle.id === vehicle.id);

    console.log(foundVehicle)

    // document.querySelector(".modal-box").classList.remove("fade-out");
    // document.querySelector(".modal-bg").classList.remove("fade-out");
    document.querySelector(".modal-box").classList.add("show");
    document.querySelector(".modal-bg").classList.add("show");

    setFilteredVehicle(foundVehicle[0]);
  }

  // Triggers add modal opening
  const handleShow = () => {
    setCreationView(true)

    document.querySelector(".modal-box").classList.remove("fade-out");
    document.querySelector(".modal-bg").classList.remove("fade-out");
    document.querySelector(".modal-box").classList.add("show");
    document.querySelector(".modal-bg").classList.add("show");
  };

  return (
    <>
      <ModalWrapper 
          filteredVehicle={filteredVehicle} 
          setFilteredVehicle={setFilteredVehicle}
          setCreationView={setCreationView}
          vehicleCreationView={creationView}
          {...props}
      />

      <div className="vehicles--container">
        <div className="vehicles--subContainer">
          <div className="vehicles--header">Vehicles</div>

          <input 
            type='text' 
            className="vehicles-searchBar" 
            onChange={handleVehicleSearch} 
            placeholder="Search for Vehicles" 
          />
          
          {vehicles !== undefined ? (
            <div className="searchResults vehicles">
              {vehicles.map(vehicle => {
                return (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    showDetailsModal={showDetailsModal}
                    {...props}
                  />
                );
              })}
            </div>
          ) : null}

            <button onClick={() => handleShow()} className="addDealership--btn">
                Add New Vehicle
            </button>
        </div>
      </div>
    </>
  );
};

export default VehiclesList;
