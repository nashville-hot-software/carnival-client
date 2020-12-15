import React from "react"
import AddVehicleTypeContainer from "./addVTFormContainer"
import SuccessSnackbar from "../modal/snackbar"
import { modal } from "../../modules/modal/helpers"

const AddForm = props => {
    return (
        <>
            <div className="modalHeader addEmployee">
                Add New Vehicle
            </div>
                
            <div className="modal-add--body">
                {/* This ternary flips between vehicle type select form & vehicle type add form */}
                {props.addVehicleTypeMode === false ? (
                    <>
                    <label className="name--label">Body Type:</label>
                    <select 
                        onChange={props.handleInputFieldChange} 
                        id="body_type" 
                        className="modal--input" 
                    >
                        <option value="none">Select One</option>
                        {props.uniqueBodyTypes !== undefined ? (
                            props.uniqueBodyTypes.map(body_type => {
                            return <option>{body_type}</option>
                        })
                        ) : null}
                    </select>
                    <label className="name--label">Make:</label>
                    <select
                        id="make"
                        onChange={props.handleInputFieldChange}
                        className="modal--input"
                    >
                        <option value="none">Select One</option>
                        {props.uniqueMakes !== undefined ? (
                            props.uniqueMakes.map(make => {
                            return <option>{make}</option>
                        })
                        ) : null}
                    </select>
                    <label className="name--label">Model:</label>
                    <select
                        id="model"
                        onChange={props.handleInputFieldChange}
                        className="modal--input"
                    >
                        <option value="none">Select One</option>
                        {props.filteredModels !== undefined ? (
                            props.filteredModels.map(vehicle => {
                            return <option>{vehicle.model}</option>
                        })
                        ) : null}
                    </select>
                    </>
                ) : (
                    <AddVehicleTypeContainer 
                        setAddVehicleTypeMode={props.setAddVehicleTypeMode}
                        uniqueBodyTypes={props.uniqueBodyTypes}
                    />
                )}

                <div>
                    <label>Don't see the right vehicle?</label>
                    <input onChange={props.handleAddNewVehicleType} type="checkbox" />
                </div>

                <label className="name--label">Engine Type:</label>
                <select 
                    id="engine_type"
                    className="modal--input"
                    onChange={props.handleInputFieldChange} 
                    defaultValue="none"
                >
                    <option value="filtered-engine-type">
                        {props.filteredVehicle !== undefined ? props.filteredVehicle.engine_type : null}
                    </option>
                    <option value="none">Select an Engine Type</option>
                    <option value="V4">V4</option>
                    <option value="V6">V6</option>
                    <option value="V8">V8</option>
                    <option value="EV">Electric Vehicle</option>
                </select>

                <label className="name--label">Year:</label>
                <input onChange={props.handleInputFieldChange} id="year_of_car" className="modal--input" type="text"/>
                {props.errors.yearOfCar !== '' ? <span className="errorMessage">{props.errors.yearOfCar}</span> : null}

                <label className="name--label">Miles:</label>
                <input onChange={props.handleInputFieldChange} id="miles_count" className="modal--input" type="text"/>
                {props.errors.milesCount !== '' ? <span className="errorMessage">{props.errors.milesCount}</span> : null}
                
                <label className="name--label">MSR Price:</label>
                {props.filteredVehicle !== undefined ? (
                    <div className="modal--input msrp-div" >{`$${props.filteredVehicle.msr_price}`}</div>
                ) : (
                    <>
                    <input 
                        onChange={props.handleInputFieldChange} 
                        id="msr_price" 
                        className="modal--input" 
                        type="text"
                        placeholder="$"
                    />
                    {props.errors.msrPrice !== '' ? <span className="errorMessage">{props.errors.msrPrice}</span> : null}
                    </>
                )}
                
                <label className="name--label">Floor Price:</label>
                <input 
                    onChange={props.handleInputFieldChange} 
                    id="floor_price" 
                    className="modal--input" 
                    type="text"
                    placeholder={`$${props.filteredVehicle !== undefined ? props.filteredVehicle.floor_price : ""}`}
                />
                {props.errors.floorPrice !== '' ? <span className="errorMessage">{props.errors.floorPrice}</span> : null}
                
                <label className="name--label">Exterior Color:</label>
                <input onChange={props.handleInputFieldChange} id="exterior_color" className="modal--input" type="text"/>
                
                <label className="name--label">Interior Color:</label>
                <input onChange={props.handleInputFieldChange} id="interior_color" className="modal--input" type="text"/>
            </div>
            
            <div className="addVehicle--btn--container">
                <button onClick={props.handleVehicleSubmit} className="modal--addBtn">
                    Submit 
                </button>
                <button 
                    className={`closeBtn ${props.vehiclePosted === true ? "disabled" : ""}`} 
                    disabled={props.vehiclePosted === true ? true : false}
                    onClick={() => modal.handleAddFormClose(props.setCreationView)}
                >
                    Close  
                </button>
            </div>

            <SuccessSnackbar 
                vehiclePosted={props.vehiclePosted} 
                setVehiclePosted={props.setVehiclePosted}
            />
        </>
    );
}

export default AddForm;