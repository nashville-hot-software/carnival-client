import React, { useEffect, useState } from "react";
import DealershipManager from "../../api/dataManager";
import "../employee/card.css"
import "../employee/editForm.css"
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import DealershipDropdown from "../modal/dealershipDropdown"
import EmployeeTypeSelect from "../modal/employeeTypesMenu"

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
    } else if (dealership.tax_id === "") {
      window.alert("Please enter a tax id")
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
                <strong>Name:</strong> 
                {/* <span>
                      {employee !== undefined ? (`${employee.first_name} ${employee.last_name}`) 
                      : (`${props.employee.first_name} ${props.employee.last_name}`)} 
                </span> */}
              </div>
              <div>
                <strong>Email:</strong> 
                {/* <span>
                  {updatedEmployee !== undefined ? (`${updatedEmployee.email_address}`) 
                  : (`${props.employee.email_address}`)}
                </span> */}
              </div>
              <div>
                <strong>Phone:</strong> 
                {/* <span>
                  {updatedEmployee !== undefined ? (`${updatedEmployee.phone}`) 
                  : (`${props.employee.phone}`)}
                </span> */}
              </div>
              <div>
                <strong>Dealership:</strong> 
                {/* <span>
                  {updatedEmployee !== undefined ? (`${updatedEmployee.dealership.business_name}`) 
                    : (`${props.employee.business_name}`)}
                </span> */}
              </div>
              <div>
                <strong>Employee Type:</strong> 
                {/* <span>
                    {updatedEmployee !== undefined ? (`${updatedEmployee.employee_type.name}`) 
                    : (`${props.employee.employee_type}`)}
                </span> */}
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
                <label><strong>First Name:</strong></label> 
                {/* <input 
                type="text"
                id="first_name"
                placeholder={updatedEmployee !== undefined ? (`${updatedEmployee.first_name}`) 
                            : (`${props.employee.first_name}`)} 
                onChange={handleFieldChange}
                className="modal--input"
                /> */}
            
            
                <label><strong>Last Name:</strong></label> 
                {/* <input 
                type="text"
                id="last_name"
                placeholder={updatedEmployee !== undefined ? (`${updatedEmployee.last_name}`) 
                            : (`${props.employee.last_name}`)} 
                onChange={handleFieldChange}
                className="modal--input"
                /> */}
            
            
                <label><strong>Email:</strong></label> 
                {/* <input 
                type="text"
                id="email_address"
                placeholder={updatedEmployee !== undefined ? (`${updatedEmployee.email_address}`) 
                            : (`${props.employee.email_address}`)}
                onChange={handleFieldChange}
                className="modal--input"
                /> */}
            
            
                <label><strong>Phone:</strong></label> 
                {/* <input 
                    type="text"
                    id="phone"
                    placeholder={updatedEmployee !== undefined ? (`${updatedEmployee.phone}`) 
                                : (`${props.employee.phone}`)}
                    onChange={handleFieldChange}
                    className="modal--input"
                /> */}

                <DealershipDropdown 
                    state={stateToChange} 
                />

                <EmployeeTypeSelect
                    state={stateToChange}
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
