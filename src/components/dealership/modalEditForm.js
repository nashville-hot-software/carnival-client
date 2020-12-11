import React, { useEffect, useState } from "react";
import DealershipManager from "../../api/dataManager";
import "../../styles/employees/card.css"
import "../../styles/employees/editForm.css"
import "../../styles/dealerships/list.css"
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import SuccessSnackbar from "../modal/snackbar"
import StateSelectDropdown from "../modal/StateSelect";
import { errorHandler, validateForm} from "../validation/formValidator"
import { modal } from "../../modules/modal/helpers"

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
    <>
        <div className="modalHeader">
            <div className="employee-details--header">
              <span>Dealership</span>
              <span className="employee-id">#{props.dealership.id}</span>
            </div>

            <div className="edit--switch">
                <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                <FormControlLabel
                    
                    value="Edit"
                    control={<Switch onClick={() => modal.handleEditMode(props.editMode,props.setEditMode)} color="#ced5f7" />}
                    label="Update"
                    labelPlacement="top"
                />
                </FormGroup>
                </FormControl>
            </div>
        </div>

        {props.editMode === false ? (
        <>
          <div className="modal-details--body">
              <div>
                <strong>Dealership Name:</strong> 
                <span>
                      {dealership !== undefined ? (`${dealership.business_name}`) 
                      : (`${props.dealership.business_name}`)} 
                </span>
              </div>
              <div>
                <strong>Location:</strong> 
                <span>
                  {dealership !== undefined ? (`${dealership.city} ${dealership.state}`) 
                  : (`${props.dealership.city} ${props.dealership.state}`)}
                </span>
              </div>
              <div>
                <strong>Phone:</strong> 
                <span>
                  {dealership !== undefined ? (`${dealership.phone}`) 
                  : (`${props.dealership.phone}`)}
                </span>
              </div>
              <div>
                <strong>Website:</strong> 
                <span>
                  {dealership !== undefined ? (`${dealership.website}`) 
                    : (`${props.dealership.website}`)}
                </span>
              </div>
              <div>
                <strong>Tax ID:</strong> 
                <span>
                  {dealership !== undefined ? (`${dealership.tax_id}`) 
                    : (`${props.dealership.tax_id}`)}
                </span>
              </div>
          </div>
          <div className="dealershipDetails--btn--container">
              <button onClick={handleDelete} className="removeEmployee--btn">
                  Remove
              </button>
              <button 
                className={`closeBtn ${dealershipEdited === true ? "disabled" : ""}`} 
                disabled={dealershipEdited === true ? true : false}
                onClick={() => modal.handleEditFormClose(props.setEditMode)}
              >
                  Close  
              </button>
          </div>
        </>
        ) : (
          <>
            <div className="modal-edit--body">
                <label><strong>Dealership Name:</strong></label> 
                <input 
                type="text"
                id="business_name"
                placeholder={dealership !== undefined ? (`${dealership.business_name}`) 
                            : (`${props.dealership.business_name}`)}
                onChange={handleFieldChange}
                className="modal--input"
                />
            
                <label><strong>City:</strong></label> 
                <input 
                type="text"
                id="city"
                placeholder={dealership !== undefined ? (`${dealership.city}`) 
                            : (`${props.dealership.city}`)}
                onChange={handleFieldChange}
                className="modal--input"
                />
                
                <StateSelectDropdown 
                    state={dealership}
                />
            
            
                <label><strong>Phone:</strong></label> 
                <input 
                type="text"
                id="phone"
                placeholder={dealership !== undefined ? (`${dealership.phone}`) 
                            : (`${props.dealership.phone}`)}
                onChange={handleFieldChange}
                className="modal--input"
                />
                {errors.phone !== '' ? <span className="errorMessage">{errors.phone}</span> : null}
            
            
                <label><strong>Website:</strong></label> 
                <input 
                    type="text"
                    id="website"
                    placeholder={dealership !== undefined ? (`${dealership.website}`) 
                                : (`${props.dealership.website}`)}
                    onChange={handleFieldChange}
                    className="modal--input"
                />
                {errors.website !== '' ? <span className="errorMessage website">{errors.website}</span> : null}


            </div>

            <div className="editDealership--btn--container">
                <button onClick={handleSubmit} className="updateEmployee--btn">
                    Update
                </button>
                <button className="closeBtn" onClick={() => modal.handleEditFormClose(props.setEditMode)}>
                    Cancel  
                </button>
            </div>
          </>
        )}
        <SuccessSnackbar 
            dealershipEdited={dealershipEdited} 
            setDealershipEdited={setDealershipEdited}
        />
    </>
  );
};

export default DealershipDetailModal;
