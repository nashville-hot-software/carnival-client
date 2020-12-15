import React, { useEffect, useState } from "react";
import VehicleManager from "../../api/dataManager";
import "../../styles/employees/card.css"
import "../../styles/employees/editForm.css"
import { errorHandler, validateForm} from "../validation/formValidator"
import { modal } from "../../modules/modal/helpers"
import VehicleDetailsEditWrapper from "./detailsEditWrapper"

const VehicleEditModal = props => {

  const [vehicle, setVehicle] = useState();  
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    zipcode: '',
    msrPrice: '',
    floorPrice: '',
    deposit: '',
    yearOfCar: '',
    milesCount: ''
    });
  const [editMode, setEditMode] = useState(false);
  
  const handleFieldChange = evt => {
      var stateToChange = {...vehicle};
      stateToChange[evt.target.id] = evt.target.value;

      if (evt.target.id === "miles_count") {
        stateToChange[evt.target.id] = parseInt(evt.target.value);
      }
      
      console.log(stateToChange);

      errorHandler(evt.target.id, evt.target.value, errors, setErrors);

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

        if (validateForm(errors)) {
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
              modal.clearForm();
              setEditMode(false);
              const muiSwitch = document.querySelector('.MuiSwitch-switchBase');
              if (muiSwitch.classList.contains('Mui-checked')) {
                muiSwitch.click();
              }
            })
      } else {
        window.alert('Please fix form fields')
      }  
    }
  } 

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete Vehicle #${props.vehicle.id}?`)) {
      VehicleManager.deleteUserData("vehicles", props.vehicle.id)
        .then(() => {
          props.setVehicleDeleted(true);
          modal.handleEditClose(setEditMode);
        });
    }
  }

  useEffect(() => {
    VehicleManager.getOne("vehicles", props.vehicle.id)
      .then(data => {
        setVehicle(data)
      });
  }, [props.vehicle])

  return (
    <VehicleDetailsEditWrapper
        updatedVehicle={vehicle}
        vehicle={props.vehicle}
        handleDelete={handleDelete}
        editMode={editMode}
        setEditMode={setEditMode}
        errors={errors}
        handleSubmit={handleSubmit}
        vehicleEdited={props.vehicleEdited} 
        setVehicleEdited={props.setVehicleEdited}
        handleFieldChange={handleFieldChange}
    />
  );
};

export default VehicleEditModal;
