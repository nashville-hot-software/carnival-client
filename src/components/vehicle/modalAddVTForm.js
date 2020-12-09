

import React, { useEffect, useState, useRef } from "react";
import VehicleManager from "../../api/dataManager"
import "../../styles/vehicles/list.css"
import "../../styles/vehicles/addForm.css"

const AddVehicleTypeForm = (props) => {
    
      // for new vehicletype POST   
      const [newVehicleType, setNewVehicleType] = useState({
        body_type: "",
        make: "",
        model: ""
      })
    
    // builds new vehicleType object to be POSTed to vehicletypes table
    const handleVehicleTypeFieldChange = evt => {
        const stateToChange = {...newVehicleType}
        stateToChange[evt.target.id] = evt.target.value;
        setNewVehicleType(stateToChange);
    }
    
    // If form data is good, POST new vehicleType then clear form fields
    const handleVehicleTypeSubmit = () => {
        if (
            newVehicleType.body_type === "" || newVehicleType.make === "" || 
            newVehicleType.model === "" 
           ) {
            window.alert("Please fill out all fields");
        } else {
            VehicleManager.PostData("vehicletypes", newVehicleType)
                .then(() => {
                    props.setAddVehicleTypeMode(false);
                    document.querySelector('input[type=checkbox').checked = false;

                    const inputs = document.querySelectorAll('input');
                    const selects = document.querySelectorAll('select');

                    inputs.forEach(input => input.value = "");
                    selects.forEach(select => select.value = "none");
                });
        }
    }

    return (
        <>
            <label className="name--label">Body Type:</label>
            <select 
                onChange={handleVehicleTypeFieldChange} 
                id="body_type" 
                className="modal--input" 
            >
                <option>Select One</option>
                {props.uniqueBodyTypes !== undefined ? (
                    props.uniqueBodyTypes.map(body_type => {
                    return <option>{body_type}</option>
                })
                ) : null}
            </select> 
            <label className="name--label">Make:</label>
            <input onChange={handleVehicleTypeFieldChange} id="make" className="modal--input" type="text"/>

            <label className="name--label">Model:</label>
            <input onChange={handleVehicleTypeFieldChange} id="model" className="modal--input" type="text"/>

            <button onClick={handleVehicleTypeSubmit}>Submit</button>
        </>
    );
};

export default AddVehicleTypeForm;
