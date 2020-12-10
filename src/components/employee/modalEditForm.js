import React, { useEffect, useState } from "react";
import EmployeeManager from "../../api/dataManager";
import "../../styles/employees/card.css"
import "../../styles/employees/editForm.css"
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import DealershipDropdown from "../modal/dealershipDropdown"
import EmployeeTypeSelect from "../modal/employeeTypesMenu"
import SuccessSnackbar from "../modal/snackbar"
import { errorHandler, validateForm} from "../validation/formValidator"

const EmployeeDetailModal = props => {

  const [employee, setEmployee] = useState();  
  
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    zipcode: '',
    price: '',
    deposit: ''
  });  

  // for success snackbar
  const [employeeUpdated, setEmployeeUpdated] = useState(false);

  const handleEditMode = () => {
      props.setEditMode(!props.editMode);

      const muiSwitch = document.querySelector('.MuiSwitch-switchBase');
      muiSwitch.classList.add('Mui-checked', 'PrivateSwitchBase-checked-2');
  };

  
  const handleFieldChange = evt => {
    
    // NOTE: NEED to figure out why stateToChange is resetting back to old data
    //       on next handleFieldChange run...
    var stateToChange = {...employee};
    stateToChange[evt.target.id] = evt.target.value;
    console.log(stateToChange);

    setEmployee(stateToChange);

    errorHandler(evt.target.id, evt.target.value, errors, setErrors);
      
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
    } else {

        if (validateForm(errors)) {
          EmployeeManager.update("employees", employee, props.employee.id)
            // Later update API to return updated obj on the PUT response instead of re-fetching
            .then(() => {
              EmployeeManager.getOne("employees", props.employee.id)
                .then(resp => {
                  setEmployee(resp);
                  setEmployeeUpdated(true);
                })
            })
            .then(() => {
              props.setEditMode(false);

              const inputs = document.querySelectorAll('input')
              const selects = document.querySelectorAll('select')
              inputs.forEach(input => input.value = "")
              selects.forEach(select => select.value = "none")
    
              const muiSwitch = document.querySelector('.MuiSwitch-switchBase');
    
              if (muiSwitch.classList.contains('Mui-checked')) {
                muiSwitch.click();
              }
            })         
        } else {
            window.alert('Please fix form entries')
        }   
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
                {errors.firstName !== '' ? <span className="errorMessage">{errors.firstName}</span> : null}
            
            
                <label><strong>Last Name:</strong></label> 
                <input 
                type="text"
                id="last_name"
                placeholder={employee !== undefined ? (`${employee.last_name}`) 
                            : (`${props.employee.last_name}`)} 
                onChange={handleFieldChange}
                className="modal--input"
                />
                {errors.lastName !== '' ? <span className="errorMessage">{errors.lastName}</span> : null}
            
            
                <label><strong>Email:</strong></label> 
                <input 
                type="text"
                id="email_address"
                placeholder={employee !== undefined ? (`${employee.email_address}`) 
                            : (`${props.employee.email_address}`)}
                onChange={handleFieldChange}
                className="modal--input"
                />
                {errors.email !== '' ? <span className="errorMessage">{errors.email}</span> : null}
            
            
                <label><strong>Phone:</strong></label> 
                <input 
                    type="text"
                    id="phone"
                    placeholder={employee !== undefined ? (`${employee.phone}`) 
                                : (`${props.employee.phone}`)}
                    onChange={handleFieldChange}
                    className="modal--input"
                />
                {errors.phone !== '' ? <span className="errorMessage phone">{errors.phone}</span> : null}

                <DealershipDropdown 
                    state={employee}
                    employeeUpdated={employeeUpdated}
                />

                <EmployeeTypeSelect
                    state={employee}
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
