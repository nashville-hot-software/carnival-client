import React from "react"
import { modal } from "../../../modules/modal/helpers"

const EmployeeDetails = props => {
    return (
        <>
            <div className="modal-details--body">
                <div>
                <strong>Name:</strong> 
                <span>
                        {props.updatedEmployee !== undefined ? (`${props.updatedEmployee.first_name} ${props.updatedEmployee.last_name}`) 
                        : (`${props.employee.first_name} ${props.employee.last_name}`)} 
                </span>
                </div>
                <div>
                <strong>Email:</strong> 
                <span>
                    {props.updatedEmployee !== undefined ? (`${props.updatedEmployee.email_address}`) 
                    : (`${props.employee.email_address}`)}
                </span>
                </div>
                <div>
                <strong>Phone:</strong> 
                <span>
                    {props.updatedEmployee !== undefined ? (`${props.updatedEmployee.phone}`) 
                    : (`${props.employee.phone}`)}
                </span>
                </div>
                <div>
                <strong>Dealership:</strong> 
                <span>
                    {props.updatedEmployee !== undefined ? (`${props.updatedEmployee.dealership.business_name}`) 
                    : (`${props.employee.business_name}`)}
                </span>
                </div>
                <div>
                <strong>Employee Type:</strong> 
                <span>
                    {props.updatedEmployee !== undefined ? (`${props.updatedEmployee.employee_type.name}`) 
                    : (`${props.employee.employee_type}`)}
                </span>
                </div>
            </div>

            <div className="removeEmployee--btn--container">
                <button onClick={props.handleDelete} className="removeEmployee--btn">
                    Remove
                </button>
                <button 
                    className={`closeBtn ${props.employeeUpdated !== false ? "disabled" : ""}`} 
                    disabled={props.employeeUpdated !== false ? true : false}
                    onClick={() => modal.handleEditFormClose(props.setEditMode)}
                >
                    Close  
                </button>
            </div>
        </>
      );
}

export default EmployeeDetails;