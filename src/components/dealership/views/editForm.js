import React from "react"
import StateSelectDropdown from "../../modal/StateSelect";
import { modal } from "../../../modules/modal/helpers"

const DealershipEditForm = props => {
    return (
        <>
            <div className="modal-edit--body">
                <label><strong>Dealership Name:</strong></label> 
                <input 
                type="text"
                id="business_name"
                placeholder={props.updatedDealership !== undefined ? (`${props.updatedDealership.business_name}`) 
                            : (`${props.dealership.business_name}`)}
                onChange={props.handleFieldChange}
                className="modal--input"
                />
            
                <label><strong>City:</strong></label> 
                <input 
                type="text"
                id="city"
                placeholder={props.updatedDealership !== undefined ? (`${props.updatedDealership.city}`) 
                            : (`${props.dealership.city}`)}
                onChange={props.handleFieldChange}
                className="modal--input"
                />
                
                <StateSelectDropdown 
                    state={props.updatedDealership}
                />
            
            
                <label><strong>Phone:</strong></label> 
                <input 
                type="text"
                id="phone"
                placeholder={props.updatedDealership !== undefined ? (`${props.updatedDealership.phone}`) 
                            : (`${props.dealership.phone}`)}
                onChange={props.handleFieldChange}
                className="modal--input"
                />
                {props.errors.phone !== '' ? <span className="errorMessage">{props.errors.phone}</span> : null}
            
            
                <label><strong>Website:</strong></label> 
                <input 
                    type="text"
                    id="website"
                    placeholder={props.updatedDealership !== undefined ? (`${props.updatedDealership.website}`) 
                                : (`${props.dealership.website}`)}
                    onChange={props.handleFieldChange}
                    className="modal--input"
                />
                {props.errors.website !== '' ? <span className="errorMessage website">{props.errors.website}</span> : null}


            </div>

            <div className="editDealership--btn--container">
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

export default DealershipEditForm;