import React from "react";
import "./card.css"
import "../employee/list.css"
import "../employee/card.css"


const VehicleDetailModal = props => {

    const handleModalClose = () => {
        document.querySelector(".modal-box").classList.remove("show");
        document.querySelector(".modal-bg").classList.remove("show");

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
        
        <div className="employee--btn--container">
            <button className="closeBtn" onClick={handleModalClose}>
                Close  
            </button>
        </div>
    </>
  );
};

export default VehicleDetailModal;
