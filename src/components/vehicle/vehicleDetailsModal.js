import React from "react";
import "./card.css"
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';


const VehicleDetailModal = props => {


  const handleModalClose = () => {
    setEditMode(false);
    setUpdatedEmployee();

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
        </div>

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
        </div>
        
        <div className="employee--btn--container">
            <button className="closeBtn" onClick={handleModalClose}>
                Close  
            </button>
        </div>
    </>
  );
};

export default VehicleDetailModal;
