import React, { useState, useRef } from "react";
import EmployeeManager from "../../api/dataManager";
import "../../styles/employees/list.css"
import DealershipDropdown from "../modal/dealershipDropdown"
import EmployeeTypeSelect from "../modal/employeeTypesMenu"
import SuccessSnackbar from "../modal/snackbar"

const AddEmployeeModal = (props) => {

    const [newEmployee, setNewEmployee] = useState({
        first_name: "",
        last_name: "",
        email_address: "",
        phone: "",
        dealership_id: 1,
        employee_type_id: 1,
    });

    const [postedEmployee, setPostedEmployee] = useState();
    const [selectedDealership, setSelectedDealership] = useState("");

    const handleClose = () => {

        clearForm();

        document.querySelector(".modal-box").classList.remove("show");
        
        setTimeout(() => {
            document.querySelector(".modal-bg").classList.remove("show");
        }, 300);
        
        setTimeout(function () {
            props.setCreationView(false)
        }, 700);
    };

    const handleInputFieldChange = (evt) => {
        const stateToChange = { ...newEmployee };
        stateToChange[evt.target.id] = evt.target.value;
        setNewEmployee(stateToChange);
    };

    const clearForm = () => {
        const inputs = document.querySelectorAll('input')
        const selects = document.querySelectorAll('select')

        inputs.forEach(input => input.value = "")
        selects.forEach(select => select.value = "none")
    }

    const handleSubmit = () => {
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
            // POST
            EmployeeManager.PostData("employees", newEmployee).then(resp => {
                console.log(resp);

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
                
                
                clearForm();

                // below clears the dealershipDropdown input
                setSelectedDealership("");
            });
        }
    };

    return (
        <>
            <div className="modalHeader addEmployee">
                Add Employee
            </div>
                
            <div className="modal-add--body">
                <label className="name--label">First Name:</label>
                <input
                    onChange={handleInputFieldChange}
                    id="first_name"
                    className="modal--input"
                    type="text"
                />

                <label className="name--label">Last Name:</label>
                <input
                    onChange={handleInputFieldChange}
                    id="last_name"
                    className="modal--input"
                    type="text"
                />

                <label className="name--label">Email:</label>
                <input
                    onChange={handleInputFieldChange}
                    id="email_address"
                    className="modal--input"
                    type="text"
                />

                <label className="name--label">Phone:</label>
                <input
                    onChange={handleInputFieldChange}
                    id="phone"
                    className="modal--input"
                    type="text"
                />

                <DealershipDropdown 
                    state={newEmployee} 
                    setState={setNewEmployee}
                    selectedDealership={selectedDealership}
                    setSelectedDealership={setSelectedDealership}
                    postedEmployee={postedEmployee}
                />

                <EmployeeTypeSelect
                    state={newEmployee}
                    setState={setNewEmployee}
                />

            </div>
            
            <div className="addEmployee--btn--container">
                <button onClick={handleSubmit} className="modal--addBtn">
                    Add Employee 
                </button>
                <button 
                    className={`closeBtn ${postedEmployee !== undefined ? "disabled" : ""}`} 
                    disabled={postedEmployee !== undefined ? true : false}
                    onClick={handleClose} 
                >
                    Close  
                </button>
            </div>

            <SuccessSnackbar 
                postedEmployee={postedEmployee} 
                setPostedEmployee={setPostedEmployee}
            />
        </>
    );
};

export default AddEmployeeModal;
