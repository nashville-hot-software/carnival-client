import React from "react"
import { modal } from "../../modules/modal/helpers"
import EmployeeDetails from "./details"
import EmployeeEditForm from "./editForm"
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import SuccessSnackbar from "../modal/snackbar"

const DetailsEditContainer = props => {
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
                        control={<Switch onClick={() => modal.handleEditMode(props.editMode,props.setEditMode)} color="#ced5f7" />}
                        label="Update"
                        labelPlacement="top"
                    />
                    </FormGroup>
                    </FormControl>
                </div>
            </div>
    
            {props.editMode === false ? (
                <EmployeeDetails 
                    updatedEmployee={props.updatedEmployee}
                    employee={props.employee}
                    employeeUpdated={props.employeeUpdated}
                    handleDelete={props.handleDelete}
                />
            ) : (
                <EmployeeEditForm 
                    updatedEmployee={props.updatedEmployee}
                    employee={props.employee}
                    employeeUpdated={props.employeeUpdated}
                    handleFieldChange={props.handleFieldChange}
                    errors={props.errors}
                    handleSubmit={props.handleSubmit}
                />
              
                /* <div className="modal-edit--body">
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
                    <button className="closeBtn" onClick={() => modal.handleEditFormClose(props.setEditMode)}>
                        Cancel  
                    </button>
                </div> */
            )}
            <SuccessSnackbar 
                employeeUpdated={props.employeeUpdated} 
                setEmployeeUpdated={props.setEmployeeUpdated}
            />
        </>
      );
}

export default DetailsEditContainer;