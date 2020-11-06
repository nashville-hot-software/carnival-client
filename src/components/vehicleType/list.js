import React, { useState, useEffect } from "react";
import VehicleTypeCard from "./card";
import VehicleManager from "../../api/dataManager";
import "./list.css"

const VehicleType = props => {

    const [vehicles, setVehicles] = useState([]);

    const handleFieldChange = evt => {
    VehicleManager.getAll("vehicletypes","searchTerm",evt.target.value)
        .then(matchedVehicles => {
            setVehicles(matchedVehicles);
        });
    }
  
    return (
      <>
        <div className="vehicletype--container">
          <div className="vehicletype--header">Vehicles</div>
          <input placeholder="Search by model type" type='text' onChange={handleFieldChange} />
          
          {vehicles !== undefined ? (
            <div>
            {vehicles.map(vehicletype => {
              return (
                <VehicleTypeCard
                  key={vehicletype.id}
                  vehicletype={vehicletype}
                  {...props}
                />
              );
            })}
            </div>
          ) : null}
        </div>
      </>
    );
  };
  
  export default VehicleType;
  