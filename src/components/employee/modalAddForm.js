import React, { useState, useRef } from "react";
import EmployeeManager from "../../api/dataManager";
import "../../styles/employees/list.css"
import DealershipDropdown from "../modal/dealershipDropdown"
import EmployeeTypeSelect from "../modal/employeeTypesMenu"
import SuccessSnackbar from "../modal/snackbar"
import { errorHandler, validateForm} from "../validation/formValidator"
import { modal } from "../../modules/modal/helpers"

const AddEmployeeModal = (props) => {

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
                {errors.firstName !== '' ? <span className="errorMessage">{errors.firstName}</span> : null}
                

                <label className="name--label">Last Name:</label>
                <input
                    onChange={handleInputFieldChange}
                    id="last_name"
                    className="modal--input"
                    type="text"
                />
                {errors.lastName !== '' ? <span className="errorMessage">{errors.lastName}</span> : null}

                <label className="name--label">Email:</label>
                <input
                    onChange={handleInputFieldChange}
                    id="email_address"
                    className="modal--input"
                    type="text"
                />
                {errors.email !== '' ? <span className="errorMessage">{errors.email}</span> : null}

                <label className="name--label">Phone:</label>
                <input
                    onChange={handleInputFieldChange}
                    id="phone"
                    className="modal--input"
                    type="text"
                />
                {errors.phone !== '' ? <span className="errorMessage phone">{errors.phone}</span> : null}

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
                    onClick={() => modal.handleAddFormClose(props.setCreationView)} 
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
