import React, { useState, useRef } from "react";
import EmployeeManager from "../../../api/dataManager";
import "../../../styles/employees/list.css"
import { errorHandler, validateForm} from "../../validation/formValidator"
import { modal } from "../../../modules/modal/helpers"
import EmployeeAddForm from "../views/addForm"

const AddEmployeeContainer = (props) => {

    const [newEmployee, setNewEmployee] = useState({
        first_name: "",
        last_name: "",
        email_address: "",
        phone: "",
        dealership_id: 1,
        employee_type_id: 1,
    });
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
    const [postedEmployee, setPostedEmployee] = useState();
    const [selectedDealership, setSelectedDealership] = useState("");

    const handleInputFieldChange = (evt) => {
        const stateToChange = { ...newEmployee };
        stateToChange[evt.target.id] = evt.target.value;

        errorHandler(evt.target.id, evt.target.value, errors, setErrors);

        setNewEmployee(stateToChange);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();

        if (newEmployee.first_name === "" || newEmployee.last_name === "") {
            window.alert("Please fill out employee name fields");
        } else if (newEmployee.email_address === "") {
            window.alert("Please enter an email address");
        } else if (newEmployee.phone === "") {
            window.alert("Please enter a phone number");
        } else if (newEmployee.dealership_id === 0) {
            window.alert("Please select a valid dealership");
        } else if (newEmployee.employee_type_id === 0) {
            window.alert("Please select a valid employee type");
        } else {
            if (validateForm(errors)) {                
                EmployeeManager.PostData("employees", newEmployee).then(resp => {
                    // this is for the success snackbar to know a successful POST was made
                    setPostedEmployee(resp);
    
                    // reset field values for next form POST
                    setNewEmployee({
                        first_name: "",
                        last_name: "",
                        email_address: "",
                        phone: "",
                        dealership_id: 0,
                        employee_type_id: 0,
                    });
                    
                    modal.clearForm();

                    // below clears the dealershipDropdown input
                    setSelectedDealership("");
                });
            } else {
                window.alert('Please fix form entries');
            }
        }
    };

    return (
        <EmployeeAddForm 
            handleInputFieldChange={handleInputFieldChange}
            errors={errors}
            state={newEmployee} 
            setState={setNewEmployee}
            selectedDealership={selectedDealership}
            setSelectedDealership={setSelectedDealership}
            newEmployee={newEmployee}
            setNewEmployee={setNewEmployee}
            postedEmployee={postedEmployee}
            setPostedEmployee={setPostedEmployee}
            setCreationView={props.setCreationView}
            handleSubmit={handleSubmit}
        />
    );
};

export default AddEmployeeContainer;
