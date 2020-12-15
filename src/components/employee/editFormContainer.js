import React, { useEffect, useState } from "react";
import EmployeeManager from "../../api/dataManager";
import "../../styles/employees/card.css"
import "../../styles/employees/editForm.css"
import { errorHandler, validateForm} from "../validation/formValidator"
import { modal } from "../../modules/modal/helpers"
import DetailsEditWrapper from "./detailsEditWrapper"

const EmployeeDetailsEditContainer = props => {
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

  const handleFieldChange = evt => {
    var stateToChange = {...employee};
    stateToChange[evt.target.id] = evt.target.value;
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
              modal.clearForm();
              
              // turn off edit switch and go back to details view
              props.setEditMode(false);
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
          modal.handleEditFormClose(props.setEditMode);
          props.setEmployeeDeleted(true);
        });
    }
  }

  useEffect(() => {
    EmployeeManager.getOne("employees", props.employee.id)
      .then(data => {
        setEmployee(data)
      });
  }, [props.employee])


  return (
    <>
      <DetailsEditWrapper 
        editMode={props.editMode}
        setEditMode={props.setEditMode}
        updatedEmployee={employee}
        employee={props.employee}
        handleFieldChange={handleFieldChange}
        employeeUpdated={employeeUpdated}
        setEmployeeUpdated={setEmployeeUpdated}
        errors={errors}
        handleDelete={handleDelete}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default EmployeeDetailsEditContainer;
