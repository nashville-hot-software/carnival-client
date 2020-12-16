import React from "react"
import Details from "./details"
import EditForm from "./editForm"
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { modal } from "../../modules/modal/helpers"

const EditDetailsWrapper = props => {
    return (
        <>
        <div className="modalHeader saleEdit--header">
            <div className="employee-details--header">
            <span>Sale</span>
            <span className="employee-id">#{props.sale.id}</span>
            </div>
            <div className="edit--switch">
            <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                <FormControlLabel
                    value="Edit"
                    control={<Switch onClick={() => modal.handleEditMode(props.editMode,props.setEditMode)} color="#ced5f7" />}
                    label="Update Sale"
                    labelPlacement="top"
                />
                </FormGroup>
            </FormControl>
            </div>
        </div>

        {props.editMode === false ? (
            <Details 
                updatedSale={props.updatedSale}
                sale={props.sale}
            />
        ) : (
            <EditForm 
                handleInputFieldChange={props.handleInputFieldChange}
                errors={props.errors}
                sale={props.updatedSale}
                setSale={props.setSale}
                handleEditSubmit={props.handleEditSubmit}
                setEditMode={props.setEditMode}
                selectedPaymentType={props.selectedPaymentType}
                selectedState={props.selectedState}
            />
        )}
        </>
    )
}

export default EditDetailsWrapper;