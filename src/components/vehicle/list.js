import React, { useState, useEffect } from "react";
import VehicleCard from "./vehicleCard"
import VehicleManager from "../../api/dataManager";
import "../../styles/vehicles/list.css"
import ModalWrapper from "../modal/modalWrapper"
import { modal } from "../../modules/modal/helpers"

const VehiclesList = props => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicle, setFilteredVehicle] = useState();
  const [creationView, setCreationView] = useState(false);

  // below 3 states are for useEffect to re-render search page with user's query
  // to reflect realtime updates/deletes from the modal form
  const [vehicleEdited, setVehicleEdited] = useState(false);
  const [vehicleDeleted, setVehicleDeleted] = useState(false);
  const [query, setQuery] = useState();

  const handleVehicleSearch = evt => {
    if (evt.target.value.length > 0) {
        setQuery(evt.target.value);

        VehicleManager.getAll("vehicles","vehicle",evt.target.value)
          .then(matchedVehicles => {
            setVehicles(matchedVehicles);
        });
    } else {
      setVehicles([])
    }
  }

  const showDetailsModal = vehicle => {
    modal.handleDetailsShow(setVehicleDeleted);

    const foundVehicle = vehicles.filter(filteredVehicle => filteredVehicle.id === vehicle.id);
    setFilteredVehicle(foundVehicle[0]);
  }

  // this reflects the vehicle update in the search list realtime by re-searching for the
  // vehicle after edit/delete
    useEffect(() => {
      VehicleManager.getAll("vehicles", "vehicle", query)
          .then(matchedVehicles => {
            setVehicles(matchedVehicles);
        });
    }, [vehicleEdited, vehicleDeleted])

  return (
    <>
      <ModalWrapper 
          matchedVehicle={filteredVehicle} 
          setFilteredVehicle={setFilteredVehicle}
          vehicleCreationView={creationView}
          setCreationView={setCreationView}
          vehicleEdited={vehicleEdited}
          setVehicleEdited={setVehicleEdited}
          setVehicleDeleted={setVehicleDeleted}
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

            <button onClick={() => modal.handleShow(setCreationView)} className="addDealership--btn">
                Add New Vehicle
            </button>
        </div>
      </div>
    </>
  );
};

export default VehiclesList;
