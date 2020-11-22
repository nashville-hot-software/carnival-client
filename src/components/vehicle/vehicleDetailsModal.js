import React from "react";
import "./card.css"
import "../employee/list.css"
import "../employee/card.css"
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


const VehicleDetailModal = props => {


  const handleModalClose = () => {

    document.querySelector(".modal-bg").classList.add("fade-out");
    document.querySelector(".modal-box").classList.add("fade-out");

    setTimeout(function () {
        document.querySelector(".modal-box").classList.remove("fade-out");
        document.querySelector(".modal-bg").classList.remove("fade-out");
        document.querySelector(".modal-box").classList.remove("show");
        document.querySelector(".modal-bg").classList.remove("show");
    }, 500);

    const muiSwitch = document.querySelector('.MuiSwitch-switchBase');

    if (muiSwitch.classList.contains('Mui-checked')) {
      muiSwitch.click();
    }
  };


  return (
    <>
        <div className="modalHeader">
            <div className="employee-details--header">
              <span>Vehicle</span>
              {/* <span className="employee-id">#{props.filteredVehicle}</span> */}
            </div>
        </div>

        <div className="modal-details--body">
            <div>
                <strong>Make:</strong> 
                {props.filteredVehicle.make}
            </div>
            <div>
                <strong>Modal:</strong> 
                {props.filteredVehicle.model}
            </div>
            <div>
                <strong>Vehicles Sold:</strong> 
                {props.filteredVehicle.vehicles_sold}
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
