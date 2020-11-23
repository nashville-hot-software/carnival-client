import React from "react";
import "./card.css"
import "../employee/list.css"
import "../employee/card.css"


const VehicleDetailModal = props => {

  const handleModalClose = () => {
    props.setFilteredVehicle();

    document.querySelector(".modal-bg").classList.add("fade-out");
    document.querySelector(".modal-box").classList.add("fade-out");

    setTimeout(function () {
        document.querySelector(".modal-box").classList.remove("fade-out");
        document.querySelector(".modal-bg").classList.remove("fade-out");
        document.querySelector(".modal-box").classList.remove("show");
        document.querySelector(".modal-bg").classList.remove("show");
    }, 500);
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
