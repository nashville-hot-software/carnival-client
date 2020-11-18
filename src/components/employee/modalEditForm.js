import React, { useEffect, useState } from "react";
import EmployeeManager from "../../api/dataManager";
import "./card.css"
import "./editForm.css"
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import DealershipDropdown from "./dealershipDropdown"
import EmployeeTypeSelect from "./employeeTypesMenu"

const EmployeeDetailModal = props => {

  const [employee, setEmployee] = useState({
    "first_name": props.employee.first_name,
    "last_name": props.employee.last_name,
    "email_address": props.employee.email_address,
    "phone": props.employee.phone,
    "dealership_id": props.employee.dealership_id,
    "employee_type_id": props.employee.employee_type_id
  });  

  const [updatedEmployee, setUpdatedEmployee] = useState();

  const [editMode, setEditMode] = useState(false);

  const handleModalClose = () => {
      setEditMode(false);

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

  const handleEditMode = () => {
      setEditMode(!editMode);

      const muiSwitch = document.querySelector('.MuiSwitch-switchBase');
      muiSwitch.classList.add('Mui-checked', 'PrivateSwitchBase-checked-2')
  };

  const handleFieldChange = evt => {
      const stateToChange = {...employee};
      stateToChange[evt.target.id] = evt.target.value;
      setEmployee(stateToChange);
  };

  const handleSubmit = () => {
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
    } else {
        EmployeeManager.update("employees", employee, props.employee.id)
            .then(() => {
              setEditMode(false);

              const muiSwitch = document.querySelector('.MuiSwitch-switchBase');

              if (muiSwitch.classList.contains('Mui-checked')) {
                muiSwitch.click();
              }
            })
            .then(() => {
              EmployeeManager.getOne("employees", props.employee.id)
                .then(resp => {
                  setUpdatedEmployee(resp);
                })
            })
    }
  } 

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

        {editMode === false ? (
        <div className="modal-details--body">
            <div>
              <strong>Name:</strong> 
              <span>
                    {updatedEmployee !== undefined ? (`${updatedEmployee.first_name} ${updatedEmployee.last_name}`) 
                    : (`${props.employee.first_name} ${props.employee.last_name}`)} 
              </span>
            </div>
            <div>
              <strong>Email:</strong> 
              <span>
                {updatedEmployee !== undefined ? (`${updatedEmployee.email_address}`) 
                : (`${props.employee.email_address}`)}
              </span>
            </div>
            <div>
              <strong>Phone:</strong> 
              <span>
                {updatedEmployee !== undefined ? (`${updatedEmployee.phone}`) 
                : (`${props.employee.phone}`)}
              </span>
            </div>
            <div>
              <strong>Dealership:</strong> 
              <span>
                {updatedEmployee !== undefined ? (`${updatedEmployee.dealership.business_name}`) 
                  : (`${props.employee.business_name}`)}
              </span>
            </div>
            <div>
              <strong>Employee Type:</strong> 
              <span>
                  {updatedEmployee !== undefined ? (`${updatedEmployee.employee_type.name}`) 
                  : (`${props.employee.employee_type}`)}
              </span>
            </div>
            <button className="closeBtn-details" onClick={handleModalClose}>
                Close  
            </button>
        </div>
        ) : (
            <div className="modal-edit--body">
                <label><strong>First Name:</strong></label> 
                <input 
                type="text"
                id="first_name"
                placeholder={updatedEmployee !== undefined ? (`${updatedEmployee.first_name}`) 
                            : (`${props.employee.first_name}`)} 
                onChange={handleFieldChange}
                className="modal--input"
                />
            
            
                <label><strong>Last Name:</strong></label> 
                <input 
                type="text"
                id="last_name"
                placeholder={updatedEmployee !== undefined ? (`${updatedEmployee.last_name}`) 
                            : (`${props.employee.last_name}`)} 
                onChange={handleFieldChange}
                className="modal--input"
                />
            
            
                <label><strong>Email:</strong></label> 
                <input 
                type="text"
                id="email_address"
                placeholder={updatedEmployee !== undefined ? (`${updatedEmployee.email_address}`) 
                            : (`${props.employee.email_address}`)}
                onChange={handleFieldChange}
                className="modal--input"
                />
            
            
                <label><strong>Phone:</strong></label> 
                <input 
                    type="text"
                    id="phone"
                    placeholder={updatedEmployee !== undefined ? (`${updatedEmployee.phone}`) 
                                : (`${props.employee.phone}`)}
                    onChange={handleFieldChange}
                    className="modal--input"
                />

                <DealershipDropdown 
                    state={employee} 
                    setState={setEmployee}
                />

                <EmployeeTypeSelect
                    state={employee}
                    setState={setEmployee}
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

export default EmployeeDetailModal;
