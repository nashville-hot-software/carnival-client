import React, { useEffect, useState } from "react";
import DealershipManager from "../../../api/dataManager";
import "../../../styles/employees/card.css"
import "../../../styles/employees/editForm.css"
import "../../../styles/dealerships/list.css"
import { errorHandler, validateForm} from "../../validation/formValidator"
import { modal } from "../../../modules/modal/helpers"
import DetailsEditWrapper from "../views/detailsEditWrapper"

const DealershipDetailModal = props => {
  const [dealership, setDealership] = useState();  
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    zipcode: '',
    price: '',
    deposit: '',
    website: ''
  });
  const [dealershipEdited, setDealershipEdited] = useState(false);
  
  const handleFieldChange = evt => {
      var stateToChange = {...dealership};
      stateToChange[evt.target.id] = evt.target.value;
      setDealership(stateToChange);

      errorHandler(evt.target.id, evt.target.value, errors, setErrors);
  };

  const handleSubmit = evt => {
    evt.preventDefault()

    if (dealership.business_name === "") {
        window.alert("Please enter a dealership name")
    } else if (dealership.city === "") {
        window.alert("Please enter city")
    } else if (dealership.state === "") {
        window.alert("Please enter a state")
    } else if (dealership.phone === "") {
        window.alert("Please enter a phone number")
    } else if (dealership.website === "") {
        window.alert("Please enter a website")
    } else if (dealership !== undefined) {
        if (validateForm(errors)) {
            DealershipManager.update("dealerships", dealership, props.dealership.id)
            // Later update API to return updated obj on the PUT response instead of re-fetching
            .then(() => {
              DealershipManager.getOne("dealerships", props.dealership.id)
                .then(resp => {
                  console.log(resp)
                  setDealership(resp);
                  setDealershipEdited(true);
                })
            })
            .then(() => {
              modal.clearForm();

              // flip edit switch back to off
              props.setEditMode(false);
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
    if (window.confirm(`Are you sure you want to delete Dealership #${props.dealership.id}?`)) {
      DealershipManager.deleteUserData("dealerships", props.dealership.id)
        .then(() => {
          props.setDealershipDeleted(true);
          modal.handleEditFormClose(props.setEditMode);
        });
    }
  }

  useEffect(() => {
    DealershipManager.getOne("dealerships", props.dealership.id)
      .then(data => {
        setDealership(data)
      });
  }, [props.dealership])

  return (
    <DetailsEditWrapper 
      updatedDealership={dealership}
      dealership={props.dealership}
      editMode={props.editMode}
      setEditMode={props.setEditMode}
      dealershipEdited={dealershipEdited}
      setDealershipEdited={setDealershipEdited}
      handleDelete={handleDelete}
      handleFieldChange={handleFieldChange}
      handleSubmit={handleSubmit}
      errors={errors}
    />
  );
};

export default DealershipDetailModal;
