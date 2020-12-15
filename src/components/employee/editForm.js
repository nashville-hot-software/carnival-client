import React from "react"
import { modal } from "../../modules/modal/helpers"
import DealershipDropdown from "../modal/dealershipDropdown"
import EmployeeTypeSelect from "../modal/employeeTypesMenu"

const EmployeeEditForm = props => {
    return (
        <>
            <div className="modal-edit--body">
                <label><strong>First Name:</strong></label> 
                <input 
                    type="text"
                    id="first_name"
                    placeholder={props.updatedEmployee !== undefined ? (`${props.updatedEmployee.first_name}`) 
                                : (`${props.employee.first_name}`)} 
                    onChange={props.handleFieldChange}
                    className="modal--input"
                />
                {props.errors.firstName !== '' ? <span className="errorMessage">{props.errors.firstName}</span> : null}
            
            
                <label><strong>Last Name:</strong></label> 
                <input 
                    type="text"
                    id="last_name"
                    placeholder={props.updatedEmployee !== undefined ? (`${props.updatedEmployee.last_name}`) 
                                : (`${props.employee.last_name}`)} 
                    onChange={props.handleFieldChange}
                    className="modal--input"
                />
                {props.errors.lastName !== '' ? <span className="errorMessage">{props.errors.lastName}</span> : null}
            
            
                <label><strong>Email:</strong></label> 
                <input 
                    type="text"
                    id="email_address"
                    placeholder={props.updatedEmployee !== undefined ? (`${props.updatedEmployee.email_address}`) 
                                : (`${props.employee.email_address}`)}
                    onChange={props.handleFieldChange}
                    className="modal--input"
                />
                {props.errors.email !== '' ? <span className="errorMessage">{props.errors.email}</span> : null}
            
            
                <label><strong>Phone:</strong></label> 
                <input 
                    type="text"
                    id="phone"
                    placeholder={props.updatedEmployee !== undefined ? (`${props.updatedEmployee.phone}`) 
                                : (`${props.employee.phone}`)}
                    onChange={props.handleFieldChange}
                    className="modal--input"
                />
                {props.errors.phone !== '' ? <span className="errorMessage phone">{props.errors.phone}</span> : null}

                <DealershipDropdown 
                    state={props.updatedEmployee}
                    employeeUpdated={props.employeeUpdated}
                />

                <EmployeeTypeSelect
                    state={props.updatedEmployee}
                />
            </div>

            <div className="editEmployee--btn--container">
                <button onClick={props.handleSubmit} className="updateEmployee--btn">
                    Update
                </button>
                <button className="closeBtn" onClick={() => modal.handleEditFormClose(props.setEditMode)}>
                    Cancel  
                </button>
            </div>
        </>
    );
}

export default EmployeeEditForm;