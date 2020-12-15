import React from "react";
import { modal } from "../../modules/modal/helpers"

const VehicleDetails = props => {

  return (
    <>
      <div className="modal-details--body">
          <div>
            <strong>Make:</strong> 
            <span>
                  {props.updatedVehicle !== undefined ? (`${props.updatedVehicle.vehicle_type.make}`) 
                  : (`${props.vehicle.make}`)} 
            </span>
          </div>
          <div>
            <strong>Model:</strong> 
            <span>
              {props.updatedVehicle !== undefined ? (`${props.updatedVehicle.vehicle_type.model}`) 
              : (`${props.vehicle.model}`)}
            </span>
          </div>
          <div>
            <strong>VIN:</strong> 
            <span>
              {props.updatedVehicle !== undefined ? (`${props.updatedVehicle.vin}`) 
              : (`${props.vehicle.vin}`)}
            </span>
          </div>
          <div>
            <strong>Mileage:</strong> 
            <span>
              {props.updatedVehicle !== undefined ? (`${props.updatedVehicle.miles_count}`) 
              : (`${props.vehicle.miles_count}`)}
            </span>
          </div>
          <div>
            <strong>Engine Type:</strong> 
            <span>
              {props.updatedVehicle !== undefined ? (`${props.updatedVehicle.engine_type}`) 
                : (`${props.vehicle.engine_type}`)}
            </span>
          </div>
          <div>
            <strong>Exterior Color:</strong> 
            <span>
              {props.updatedVehicle !== undefined ? (`${props.updatedVehicle.exterior_color}`) 
                : (`${props.vehicle.exterior_color}`)}
            </span>
          </div>
          <div>
            <strong>Interior Color:</strong> 
            <span>
              {props.updatedVehicle !== undefined ? (`${props.updatedVehicle.interior_color}`) 
                : (`${props.vehicle.interior_color}`)}
            </span>
          </div>
      </div>
      <div className="vehicleDetails--btn--container">
          <button onClick={props.handleDelete} className="removeEmployee--btn">
              Remove
          </button>
          <button 
            className={`closeBtn ${props.vehicleEdited === true ? "disabled" : ""}`} 
            disabled={props.vehicleEdited === true ? true : false}
            onClick={() => modal.handleEditFormClose(props.setEditMode)}>
              Close  
          </button>
      </div>
    </>
  );
};

export default VehicleDetails;
