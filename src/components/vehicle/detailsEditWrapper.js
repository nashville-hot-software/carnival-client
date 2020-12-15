import React from "react"
import VehicleDetails from "./details"
import VehicleEditForm from "./editForm"
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { modal } from "../../modules/modal/helpers"

const VehicleDetailsEditWrapper = props => {
    return (
        <>
            <div className="modalHeader">
                <div className="employee-details--header">
                  <span>Vehicle</span>
                  <span className="employee-id">#{props.vehicle.id}</span>
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
                <VehicleDetails 
                    updatedVehicle={props.updatedVehicle}
                    vehicle={props.vehicle}
                    handleDelete={props.handleDelete}
                    errors={props.errors}
                    handleSubmit={props.handleSubmit}
                    setEditMode={props.setEditMode}
                    vehicleEdited={props.vehicleEdited} 
                    setVehicleEdited={props.setVehicleEdited}
                />

            // <>
            //   <div className="modal-details--body">
            //       <div>
            //         <strong>Make:</strong> 
            //         <span>
            //               {vehicle !== undefined ? (`${vehicle.vehicle_type.make}`) 
            //               : (`${props.vehicle.make}`)} 
            //         </span>
            //       </div>
            //       <div>
            //         <strong>Model:</strong> 
            //         <span>
            //           {vehicle !== undefined ? (`${vehicle.vehicle_type.model}`) 
            //           : (`${props.vehicle.model}`)}
            //         </span>
            //       </div>
            //       <div>
            //         <strong>VIN:</strong> 
            //         <span>
            //           {vehicle !== undefined ? (`${vehicle.vin}`) 
            //           : (`${props.vehicle.vin}`)}
            //         </span>
            //       </div>
            //       <div>
            //         <strong>Mileage:</strong> 
            //         <span>
            //           {vehicle !== undefined ? (`${vehicle.miles_count}`) 
            //           : (`${props.vehicle.miles_count}`)}
            //         </span>
            //       </div>
            //       <div>
            //         <strong>Engine Type:</strong> 
            //         <span>
            //           {vehicle !== undefined ? (`${vehicle.engine_type}`) 
            //             : (`${props.vehicle.engine_type}`)}
            //         </span>
            //       </div>
            //       <div>
            //         <strong>Exterior Color:</strong> 
            //         <span>
            //           {vehicle !== undefined ? (`${vehicle.exterior_color}`) 
            //             : (`${props.vehicle.exterior_color}`)}
            //         </span>
            //       </div>
            //       <div>
            //         <strong>Interior Color:</strong> 
            //         <span>
            //           {vehicle !== undefined ? (`${vehicle.interior_color}`) 
            //             : (`${props.vehicle.interior_color}`)}
            //         </span>
            //       </div>
            //   </div>
            //   <div className="vehicleDetails--btn--container">
            //       <button onClick={handleDelete} className="removeEmployee--btn">
            //           Remove
            //       </button>
            //       <button 
            //         className={`closeBtn ${props.vehicleEdited === true ? "disabled" : ""}`} 
            //         disabled={props.vehicleEdited === true ? true : false}
            //         onClick={() => modal.handleEditFormClose(setEditMode)}>
            //           Close  
            //       </button>
            //   </div>
            // </>
            ) : (
                <VehicleEditForm 
                    updatedVehicle={props.updatedVehicle}
                    vehicle={props.vehicle}
                    handleFieldChange={props.handleFieldChange}
                />

            //   <>
            //     <div className="modal-edit--body">
                
            //         <label><strong>Mileage:</strong></label> 
            //         <input 
            //             type="text"
            //             id="miles_count"
            //             placeholder={vehicle !== undefined ? (`${vehicle.miles_count}`) 
            //                         : (`${props.vehicle.miles_count}`)}
            //             onChange={handleFieldChange}
            //             className="modal--input"
            //         />
            //         {errors.milesCount !== '' ? <span className="errorMessage">{errors.milesCount}</span> : null}
    
            //         <label><strong>Exterior Color:</strong></label> 
            //         <input 
            //             type="text"
            //             id="exterior_color"
            //             placeholder={vehicle !== undefined ? (`${vehicle.exterior_color}`) 
            //                         : (`${props.vehicle.exterior_color}`)}
            //             onChange={handleFieldChange}
            //             className="modal--input"
            //         />
                   
            //         <label><strong>Interior Color:</strong></label> 
            //         <input 
            //             type="text"
            //             id="interior_color"
            //             placeholder={vehicle !== undefined ? (`${vehicle.interior_color}`) 
            //                         : (`${props.vehicle.interior_color}`)}
            //             onChange={handleFieldChange}
            //             className="modal--input"
            //         />
            //     </div>
            //     <div className="editVehicle--btn--container">
            //         <button onClick={handleSubmit} className="updateEmployee--btn">
            //             Update
            //         </button>
            //         <button className="closeBtn" onClick={() => modal.handleEditFormClose(setEditMode)}>
            //             Cancel  
            //         </button>
            //     </div>
            //   </>
            // )}
            // <SuccessSnackbar 
            //     vehicleEdited={props.vehicleEdited} 
            //     setVehicleEdited={props.setVehicleEdited}
            // />
            )}
        </>
      );
}

export default VehicleDetailsEditWrapper;