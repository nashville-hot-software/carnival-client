import React from "react"
import DealershipDetails from "./details"
import DealershipEditForm from "./editForm"
import SuccessSnackbar from "../modal/snackbar"
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { modal } from "../../modules/modal/helpers"

const DetailsEditWrapper = props => {
    return (
        <>
        <div className="modalHeader">
            <div className="employee-details--header">
              <span>Dealership</span>
              <span className="employee-id">#{props.dealership.id}</span>
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
            <DealershipDetails 
                updatedDealership={props.updatedDealership}
                dealership={props.dealership}
                handleDelete={props.handleDelete}
                dealershipEdited={props.dealershipEdited}
                setEditMode={props.setEditMode}
            />
        ) : (
            <DealershipEditForm 
                updatedDealership={props.updatedDealership}
                dealership={props.dealership}
                handleFieldChange={props.handleFieldChange}
                errors={props.errors}
                handleSubmit={props.handleSubmit}
            />
        )}
        
        <SuccessSnackbar 
            dealershipEdited={props.dealershipEdited} 
            setDealershipEdited={props.setDealershipEdited}
        />
    </>
    )
}

export default DetailsEditWrapper;