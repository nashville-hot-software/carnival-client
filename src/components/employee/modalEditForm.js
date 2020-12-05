import React, { useEffect, useState } from "react";
import EmployeeManager from "../../api/dataManager";
import "./card.css"
import "./editForm.css"
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import DealershipDropdown from "../modal/dealershipDropdown"
import EmployeeTypeSelect from "../modal/employeeTypesMenu"
import SuccessSnackbar from "../modal/snackbar"

const EmployeeDetailModal = props => {

  const [employee, setEmployee] = useState();  

  // updated employee for the PUT 
  const [updatedEmployee, setUpdatedEmployee] = useState();

  // for success snackbar
  const [employeeUpdated, setEmployeeUpdated] = useState(false);

  // const [editMode, setEditMode] = useState(false);

  const handleEditMode = () => {
      props.setEditMode(!props.editMode);

      const muiSwitch = document.querySelector('.MuiSwitch-switchBase');
      muiSwitch.classList.add('Mui-checked', 'PrivateSwitchBase-checked-2');
  };

  // NOTE: So the problem here is when I'm passing this down as a prop to 
  //       dealershipDropdown it's holding on to the old employee state
  //       before field updates...
  var stateToChange = {...employee};

  const handleFieldChange = evt => {
      
      stateToChange[evt.target.id] = evt.target.value;
      
      console.log(stateToChange)
  };

  const handleSubmit = evt => {
    evt.preventDefault()

    if (employee.first_name === "" || employee.last_name === "") {
        window.alert("Please fill out employee name fields")
    } else if (employee.email_address === "") {
        window.alert("Please enter an email address")
    } else if (employee.phone === "") {
        window.alert("Please enter a phone number")
    } else if (employee.dealership_id === 0) {
        window.alert("Please select a valid dealership")
    } else if (employee.employee_type_id === 0) {
        window.alert("Please select a valid employee type")
    } else if (stateToChange !== undefined) {

        // NOTE: this stateToChange is not the updated one after handleFieldChange runs...
        console.log(stateToChange);
        
        setUpdatedEmployee(stateToChange);

        const inputs = document.querySelectorAll('input')
        const selects = document.querySelectorAll('select')
        inputs.forEach(input => input.value = "")
        selects.forEach(select => select.value = "none")
    }
  } 

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete Employee #${props.employee.id}?`)) {
      EmployeeManager.deleteUserData("employees", props.employee.id)
        .then(() => {
          handleModalClose();
          props.setEmployeeDeleted(true);
        });
    }
  }

  const handleModalClose = () => {
    props.setEditMode(false);
    setUpdatedEmployee();

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
    EmployeeManager.getOne("employees", props.employee.id)
      .then(data => {
        setEmployee(data)
      });
  }, [props.employee])
  
  // Only runs when an employee's been edited (updatedEmployee defined on 'Update' btn click)
  useEffect(() => {
    if (updatedEmployee !== undefined) {
      EmployeeManager.update("employees", updatedEmployee, props.employee.id)
        // Later update API to return updated obj on the PUT response instead of re-fetching
        .then(() => {
          EmployeeManager.getOne("employees", props.employee.id)
            .then(resp => {
              console.log(resp)
              setUpdatedEmployee();
              setEmployee(resp);
              setEmployeeUpdated(true);
            })
        })
        .then(() => {
          props.setEditMode(false);

          const muiSwitch = document.querySelector('.MuiSwitch-switchBase');

          if (muiSwitch.classList.contains('Mui-checked')) {
            muiSwitch.click();
          }
        })
        
    }
  }, [updatedEmployee])



  return (
    <>
        <div className="modalHeader">
            <div className="employee-details--header">
              <span>Employee</span>
              <span className="employee-id">#{props.employee.id}</span>
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

        {props.editMode === false ? (
        <>
          <div className="modal-details--body">
              <div>
                <strong>Name:</strong> 
                <span>
                      {employee !== undefined ? (`${employee.first_name} ${employee.last_name}`) 
                      : (`${props.employee.first_name} ${props.employee.last_name}`)} 
                </span>
              </div>
              <div>
                <strong>Email:</strong> 
                <span>
                  {employee !== undefined ? (`${employee.email_address}`) 
                  : (`${props.employee.email_address}`)}
                </span>
              </div>
              <div>
                <strong>Phone:</strong> 
                <span>
                  {employee !== undefined ? (`${employee.phone}`) 
                  : (`${props.employee.phone}`)}
                </span>
              </div>
              <div>
                <strong>Dealership:</strong> 
                <span>
                  {employee !== undefined ? (`${employee.dealership.business_name}`) 
                    : (`${props.employee.business_name}`)}
                </span>
              </div>
              <div>
                <strong>Employee Type:</strong> 
                <span>
                    {employee !== undefined ? (`${employee.employee_type.name}`) 
                    : (`${props.employee.employee_type}`)}
                </span>
              </div>
          </div>
          <div className="removeEmployee--btn--container">
              <button onClick={handleDelete} className="removeEmployee--btn">
                  Remove
              </button>
              <button 
                className={`closeBtn ${employeeUpdated !== false ? "disabled" : ""}`} 
                disabled={employeeUpdated !== false ? true : false}
                onClick={handleModalClose}>
                  Close  
              </button>
          </div>
        </>
        ) : (
          <>
            <div className="modal-edit--body">
                <label><strong>First Name:</strong></label> 
                <input 
                type="text"
                id="first_name"
                placeholder={employee !== undefined ? (`${employee.first_name}`) 
                            : (`${props.employee.first_name}`)} 
                onChange={handleFieldChange}
                className="modal--input"
                />
            
            
                <label><strong>Last Name:</strong></label> 
                <input 
                type="text"
                id="last_name"
                placeholder={employee !== undefined ? (`${employee.last_name}`) 
                            : (`${props.employee.last_name}`)} 
                onChange={handleFieldChange}
                className="modal--input"
                />
            
            
                <label><strong>Email:</strong></label> 
                <input 
                type="text"
                id="email_address"
                placeholder={employee !== undefined ? (`${employee.email_address}`) 
                            : (`${props.employee.email_address}`)}
                onChange={handleFieldChange}
                className="modal--input"
                />
            
            
                <label><strong>Phone:</strong></label> 
                <input 
                    type="text"
                    id="phone"
                    placeholder={employee !== undefined ? (`${employee.phone}`) 
                                : (`${props.employee.phone}`)}
                    onChange={handleFieldChange}
                    className="modal--input"
                />

                <DealershipDropdown 
                    state={stateToChange}
                    employeeUpdated={employeeUpdated}
                />

                <EmployeeTypeSelect
                    state={stateToChange}
                />
            </div>

            <div className="editEmployee--btn--container">
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
            employeeUpdated={employeeUpdated} 
            setEmployeeUpdated={setEmployeeUpdated}
        />
    </>
  );
};

export default EmployeeDetailModal;
