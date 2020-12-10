import React, { useEffect, useState } from "react";
import VehicleManager from "../../api/dataManager";
import "../../styles/employees/card.css"
import "../../styles/employees/editForm.css"
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import SuccessSnackbar from "../modal/snackbar"

const VehicleEditModal = props => {

  const [vehicle, setVehicle] = useState();  
  const [editMode, setEditMode] = useState(false);

  const handleEditMode = () => {
      setEditMode(!editMode);

      const muiSwitch = document.querySelector('.MuiSwitch-switchBase');
      muiSwitch.classList.add('Mui-checked', 'PrivateSwitchBase-checked-2');
  };

  
  const handleFieldChange = evt => {
      var stateToChange = {...vehicle};
      stateToChange[evt.target.id] = evt.target.value;

      if (evt.target.id === "miles_count") {
        stateToChange[evt.target.id] = parseInt(evt.target.value);
      }
      
      console.log(stateToChange);

      setVehicle(stateToChange);
  };

  const handleSubmit = evt => {
    evt.preventDefault()

    if (vehicle.exterior_color === "") {
        window.alert("Please enter a vehicle name")
    } else if (vehicle.interior_color === "") {
        window.alert("Please enter city")
    } else if (vehicle.miles_count === "") {
      window.alert("Please enter vehicle mileage")
    } else {
        console.log(vehicle);

        VehicleManager.update("vehicles", vehicle, props.vehicle.id)
        // Later update API to return updated obj on the PUT response instead of re-fetching
        .then(() => {
          VehicleManager.getOne("vehicles", props.vehicle.id)
            .then(resp => {
              console.log("Respone from DB VV")
              console.log(resp)

              setVehicle(resp);
              props.setVehicleEdited(true);
            })
        })
        .then(() => {
          setEditMode(false);

          const muiSwitch = document.querySelector('.MuiSwitch-switchBase');
          if (muiSwitch.classList.contains('Mui-checked')) {
            muiSwitch.click();
          }
        })
      
        // clear form
        const inputs = document.querySelectorAll('input')
        const selects = document.querySelectorAll('select')
        inputs.forEach(input => input.value = "")
        selects.forEach(select => select.value = "none")
    }
  } 

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete Vehicle #${props.vehicle.id}?`)) {
      VehicleManager.deleteUserData("vehicles", props.vehicle.id)
        .then(() => {
          props.setVehicleDeleted(true);
          handleModalClose();
        });
    }
  }

  const handleModalClose = () => {
    setEditMode(false);

    const inputs = document.querySelectorAll('input')
    const selects = document.querySelectorAll('select')
    inputs.forEach(input => input.value = "")
    selects.forEach(select => select.value = "none")

    document.querySelector(".modal-box").classList.remove("show");
    
    setTimeout(() => {
      document.querySelector(".modal-bg").classList.remove("show");
    }, 300);

    const muiSwitch = document.querySelector('.MuiSwitch-switchBase');

    if (muiSwitch.classList.contains('Mui-checked')) {
      muiSwitch.click();
    }
  };

  useEffect(() => {
    VehicleManager.getOne("vehicles", props.vehicle.id)
      .then(data => {
        setVehicle(data)
      });
  }, [props.vehicle])

  return (
    <>
        <div className="modalHeader">
            <div className="employee-details--header">
              <span>Vehicle</span>
              <span className="employee-id">#{props.vehicle.id}</span>
            </div>

            <div className="edit--switch">
                <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                <FormControlLabel
                    
                    value="Edit"
                    control={<Switch onClick={handleEditMode} color="#ced5f7" />}
                    label="Update"
                    labelPlacement="top"
                />
                </FormGroup>
                </FormControl>
            </div>
        </div>

        {editMode === false ? (
        <>
          <div className="modal-details--body">
              <div>
                <strong>Make:</strong> 
                <span>
                      {vehicle !== undefined ? (`${vehicle.vehicle_type.make}`) 
                      : (`${props.vehicle.make}`)} 
                </span>
              </div>
              <div>
                <strong>Model:</strong> 
                <span>
                  {vehicle !== undefined ? (`${vehicle.vehicle_type.model}`) 
                  : (`${props.vehicle.model}`)}
                </span>
              </div>
              <div>
                <strong>VIN:</strong> 
                <span>
                  {vehicle !== undefined ? (`${vehicle.vin}`) 
                  : (`${props.vehicle.vin}`)}
                </span>
              </div>
              <div>
                <strong>Mileage:</strong> 
                <span>
                  {vehicle !== undefined ? (`${vehicle.miles_count}`) 
                  : (`${props.vehicle.miles_count}`)}
                </span>
              </div>
              <div>
                <strong>Engine Type:</strong> 
                <span>
                  {vehicle !== undefined ? (`${vehicle.engine_type}`) 
                    : (`${props.vehicle.engine_type}`)}
                </span>
              </div>
              <div>
                <strong>Exterior Color:</strong> 
                <span>
                  {vehicle !== undefined ? (`${vehicle.exterior_color}`) 
                    : (`${props.vehicle.exterior_color}`)}
                </span>
              </div>
              <div>
                <strong>Interior Color:</strong> 
                <span>
                  {vehicle !== undefined ? (`${vehicle.interior_color}`) 
                    : (`${props.vehicle.interior_color}`)}
                </span>
              </div>
          </div>
          <div className="vehicleDetails--btn--container">
              <button onClick={handleDelete} className="removeEmployee--btn">
                  Remove
              </button>
              <button 
                className={`closeBtn ${props.vehicleEdited === true ? "disabled" : ""}`} 
                disabled={props.vehicleEdited === true ? true : false}
                onClick={handleModalClose}>
                  Close  
              </button>
          </div>
        </>
        ) : (
          <>
            <div className="modal-edit--body">
            
                <label><strong>Mileage:</strong></label> 
                <input 
                    type="text"
                    id="miles_count"
                    placeholder={vehicle !== undefined ? (`${vehicle.miles_count}`) 
                                : (`${props.vehicle.miles_count}`)}
                    onChange={handleFieldChange}
                    className="modal--input"
                />

                <label><strong>Exterior Color:</strong></label> 
                <input 
                    type="text"
                    id="exterior_color"
                    placeholder={vehicle !== undefined ? (`${vehicle.exterior_color}`) 
                                : (`${props.vehicle.exterior_color}`)}
                    onChange={handleFieldChange}
                    className="modal--input"
                />
               
                <label><strong>Interior Color:</strong></label> 
                <input 
                    type="text"
                    id="interior_color"
                    placeholder={vehicle !== undefined ? (`${vehicle.interior_color}`) 
                                : (`${props.vehicle.interior_color}`)}
                    onChange={handleFieldChange}
                    className="modal--input"
                />
            </div>
            <div className="editVehicle--btn--container">
                <button onClick={handleSubmit} className="updateEmployee--btn">
                    Update
                </button>
                <button className="closeBtn" onClick={handleModalClose}>
                    Cancel  
                </button>
            </div>
          </>
        )}
        <SuccessSnackbar 
            vehicleEdited={props.vehicleEdited} 
            setVehicleEdited={props.setVehicleEdited}
        />
    </>
  );
};

export default VehicleEditModal;
