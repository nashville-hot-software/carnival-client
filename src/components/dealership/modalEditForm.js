import React, { useEffect, useState } from "react";
import DealershipManager from "../../api/dataManager";
import "../employee/card.css"
import "../employee/editForm.css"
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const DealershipDetailModal = props => {

  const [dealership, setDealership] = useState();  
  const [updatedDealership, setUpdatedDealership] = useState();
  const [editMode, setEditMode] = useState(false);

  const handleEditMode = () => {
      setEditMode(!editMode);

      const muiSwitch = document.querySelector('.MuiSwitch-switchBase');
      muiSwitch.classList.add('Mui-checked', 'PrivateSwitchBase-checked-2');
  };

  var stateToChange = {...dealership};

  const handleFieldChange = evt => {
      stateToChange[evt.target.id] = evt.target.value;
      console.log(stateToChange)
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
    } else if (stateToChange !== undefined) {
        setUpdatedDealership(stateToChange);

        // clear form
        const inputs = document.querySelectorAll('input')
        const selects = document.querySelectorAll('select')
        inputs.forEach(input => input.value = "")
        selects.forEach(select => select.value = "none")
    }
  } 

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete Dealership #${props.dealership.id}?`)) {
      DealershipManager.deleteUserData("dealerships", props.dealership.id)
        .then(handleModalClose());
    }
  }

  const handleModalClose = () => {
    setEditMode(false);
    setUpdatedDealership();

    const inputs = document.querySelectorAll('input')
    const selects = document.querySelectorAll('select')
    inputs.forEach(input => input.value = "")
    selects.forEach(select => select.value = "none")

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

  useEffect(() => {
    DealershipManager.getOne("dealerships", props.dealership.id)
      .then(data => {
        setDealership(data)
      });
  }, [props.dealership])
  
  useEffect(() => {
    if (updatedDealership !== undefined) {
      DealershipManager.update("dealerships", updatedDealership, props.dealership.id)
        // Later update API to return updated obj on the PUT response instead of re-fetching
        .then(() => {
          DealershipManager.getOne("dealerships", props.dealership.id)
            .then(resp => {
              console.log(resp)
              setUpdatedDealership();
              setDealership(resp);
            })
        })
        .then(() => {
          setEditMode(false);

          const muiSwitch = document.querySelector('.MuiSwitch-switchBase');

          if (muiSwitch.classList.contains('Mui-checked')) {
            muiSwitch.click();
          }
        })
        
    }
  }, [updatedDealership])



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
                    control={<Switch onClick={handleEditMode} color="#ced5f7" />}
                    label="Update"
                    labelPlacement="top"
                />
                </FormGroup>
                </FormControl>
            </div>

            {/* <ul>
                <li class="ele">
                    <div
                        type="button"
                        onClick={handleModalClose}
                        className="x spin large "
                    >
                        <b></b>
                        <b></b>
                        <b></b>
                        <b></b>
                    </div>
                </li>
            </ul> */}
        </div>

        {editMode === false ? (
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
          </div>
          <div className="employee--btn--container">
              <button onClick={handleDelete} className="removeEmployee--btn">
                  Remove
              </button>
              <button className="closeBtn" onClick={handleModalClose}>
                  Cancel  
              </button>
          </div>
        </>
        ) : (
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
                
                <label><strong>State:</strong></label> 
                <input 
                type="text"
                id="state"
                placeholder={dealership !== undefined ? (`${dealership.state}`) 
                            : (`${props.dealership.state}`)}
                onChange={handleFieldChange}
                className="modal--input"
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
            
            
                <label><strong>Website:</strong></label> 
                <input 
                    type="text"
                    id="website"
                    placeholder={dealership !== undefined ? (`${dealership.website}`) 
                                : (`${props.dealership.website}`)}
                    onChange={handleFieldChange}
                    className="modal--input"
                />

                <div className="addEmployee--btn--container">
                    <button onClick={handleSubmit} className="updateEmployee--btn">
                        Update
                    </button>
                    <button className="closeBtn" onClick={handleModalClose}>
                        Cancel  
                    </button>
                </div>

            </div>
        )}
    </>
  );
};

export default DealershipDetailModal;
