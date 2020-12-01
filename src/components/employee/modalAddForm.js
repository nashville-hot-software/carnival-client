import React, { useState } from "react";
import EmployeeManager from "../../api/dataManager";
import "./list.css";
import DealershipDropdown from "../modal/dealershipDropdown"
import EmployeeTypeSelect from "../modal/employeeTypesMenu"

const AddEmployeeModal = (props) => {

    const [newEmployee, setNewEmployee] = useState({
        first_name: "",
        last_name: "",
        email_address: "",
        phone: "",
        dealership_id: 1,
        employee_type_id: 1,
    });

    const handleClose = () => {

        const inputs = document.querySelectorAll('input')
        const selects = document.querySelectorAll('select')

        inputs.forEach(input => input.value = "")
        selects.forEach(select => select.value = "none")

        document.querySelector(".modal-box").classList.remove("show");
        document.querySelector(".modal-bg").classList.remove("show");
        
        setTimeout(function () {
            props.setCreationView(false)
        }, 700);
    };

    const handleInputFieldChange = (evt) => {
        const stateToChange = { ...newEmployee };
        stateToChange[evt.target.id] = evt.target.value;
        setNewEmployee(stateToChange);
    };

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
            // Make the POST, then clear all data from form
            EmployeeManager.PostData("employees", newEmployee).then(() => {
                setNewEmployee({
                    first_name: "",
                    last_name: "",
                    email_address: "",
                    phone: "",
                    dealership_id: 0,
                    employee_type_id: 0,
                });
                
                const inputs = document.querySelectorAll('input')
                const selects = document.querySelectorAll('select')

                inputs.forEach(input => input.value = "")
                selects.forEach(select => select.value = "none")
            });
        }
    };

    return (
        <>
            <div className="modalHeader addEmployee">
                Add Employee

                {/* <ul>
                    <li class="ele">
                        <div
                            type="button"
                            onClick={handleClose}
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
                />

                <EmployeeTypeSelect
                    state={newEmployee}
                    setState={setNewEmployee}
                />

                <div className="addEmployee--btn--container">
                    <button onClick={handleSubmit} className="modal--addBtn">
                        Add Employee 
                    </button>
                    <button className="closeBtn" onClick={handleClose}>
                        Close  
                    </button>
                </div>
            </div>
        </>
    );
};

export default AddEmployeeModal;
