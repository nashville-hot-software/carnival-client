import React from "react"
import { modal } from "../../modules/modal/helpers"

const VehicleEditForm = props => {

    return (
        <>
            <div className="modal-edit--body">
                <label><strong>Mileage:</strong></label> 
                <input 
                    type="text"
                    id="miles_count"
                    placeholder={props.updatedVehicle !== undefined ? `${props.updatedVehicle.miles_count}`
                                : `${props.vehicle.miles_count}`}
                    onChange={props.handleFieldChange}
                    className="modal--input"
                />
                {props.errors.milesCount !== '' ? <span className="errorMessage">{props.errors.milesCount}</span> : null}

                <label><strong>Exterior Color:</strong></label> 
                <input 
                    type="text"
                    id="exterior_color"
                    placeholder={props.updatedVehicle !== undefined ? (`${props.updatedVehicle.exterior_color}`) 
                                : (`${props.vehicle.exterior_color}`)}
                    onChange={props.handleFieldChange}
                    className="modal--input"
                />
                
                <label><strong>Interior Color:</strong></label> 
                <input 
                    type="text"
                    id="interior_color"
                    placeholder={props.updatedVehicle !== undefined ? (`${props.updatedVehicle.interior_color}`) 
                                : (`${props.vehicle.interior_color}`)}
                    onChange={props.handleFieldChange}
                    className="modal--input"
                />
            </div>

            <div className="editVehicle--btn--container">
                <button onClick={props.handleSubmit} className="updateEmployee--btn">
                    Update
                </button>
                <button className="closeBtn" onClick={() => modal.handleEditFormClose(props.setEditMode)}>
                    Cancel  
                </button>
            </div>
        </>
    )
}

export default VehicleEditForm;