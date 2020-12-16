import React from "react";
import DealershipDropdown from "../../modal/dealershipDropdown"
import EmployeeTypeSelect from "../../modal/employeeTypesMenu"
import SuccessSnackbar from "../../modal/snackbar"
import { modal } from "../../../modules/modal/helpers"

const EmployeeAddForm = props => {
    return (
        <>
            <div className="modalHeader addEmployee">
                Add Employee
            </div>
                
            <div className="modal-add--body">
                <label className="name--label">First Name:</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="first_name"
                    className="modal--input"
                    type="text"
                />
                {props.errors.firstName !== '' ? <span className="errorMessage">{props.errors.firstName}</span> : null}
                

                <label className="name--label">Last Name:</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="last_name"
                    className="modal--input"
                    type="text"
                />
                {props.errors.lastName !== '' ? <span className="errorMessage">{props.errors.lastName}</span> : null}

                <label className="name--label">Email:</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="email_address"
                    className="modal--input"
                    type="text"
                />
                {props.errors.email !== '' ? <span className="errorMessage">{props.errors.email}</span> : null}

                <label className="name--label">Phone:</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="phone"
                    className="modal--input"
                    type="text"
                />
                {props.errors.phone !== '' ? <span className="errorMessage phone">{props.errors.phone}</span> : null}

                <DealershipDropdown 
                    state={props.newEmployee} 
                    setState={props.setNewEmployee}
                    selectedDealership={props.selectedDealership}
                    setSelectedDealership={props.setSelectedDealership}
                    postedEmployee={props.postedEmployee}
                />

                <EmployeeTypeSelect
                    state={props.newEmployee}
                    setState={props.setNewEmployee}
                />

            </div>
            
            <div className="addEmployee--btn--container">
                <button onClick={props.handleSubmit} className="modal--addBtn">
                    Add Employee 
                </button>
                <button 
                    className={`closeBtn ${props.postedEmployee !== undefined ? "disabled" : ""}`} 
                    disabled={props.postedEmployee !== undefined ? true : false}
                    onClick={() => modal.handleAddFormClose(props.setCreationView)} 
                >
                    Close  
                </button>
            </div>

            <SuccessSnackbar 
                postedEmployee={props.postedEmployee} 
                setPostedEmployee={props.setPostedEmployee}
            />
        </>
    );
}

export default EmployeeAddForm;