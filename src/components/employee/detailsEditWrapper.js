import React from "react"
import { modal } from "../../modules/modal/helpers"
import EmployeeDetails from "./details"
import EmployeeEditForm from "./editForm"
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import SuccessSnackbar from "../modal/snackbar"

const DetailsEditWrapper = props => {
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
            )}
            
            <SuccessSnackbar 
                employeeUpdated={props.employeeUpdated} 
                setEmployeeUpdated={props.setEmployeeUpdated}
            />
        </>
      );
}

export default DetailsEditWrapper;