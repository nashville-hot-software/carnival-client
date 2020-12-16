import React from "react";
import "../../../styles/vehicles/card.css"
import "../../../styles/employees/list.css"
import "../../../styles/employees/card.css"
import { modal } from "../../../modules/modal/helpers"

const VehicleDetailModal = props => {

    const handleModalClose = () => {
        modal.handleClose();

        setTimeout(function () {
            props.setFilteredVehicle();
        }, 700);
    };

  return (
    <>
        <div className="modalHeader">
            <div className="employee-details--header">
              <span>Vehicle</span>
            </div>
        </div>

        <div className="modal-details--body">
            <div>
                <strong>Make:</strong> 
                {props.vehicle.make}
            </div>
            <div>
                <strong>Modal:</strong> 
                {props.vehicle.model}
            </div>
            <div>
                <strong>Vehicles Sold:</strong> 
                {props.vehicle.vehicles_sold}
            </div>
        </div>
        
        <div className="dashVehicles--btn--container">
            <button className="closeBtn" onClick={handleModalClose}>
                Close  
            </button>
        </div>
    </>
  );
};

export default VehicleDetailModal;
