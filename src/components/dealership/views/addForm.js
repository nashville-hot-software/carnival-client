import React from "react"
import SuccessSnackbar from "../../modal/snackbar"
import StateSelectDropdown from "../../modal/StateSelect";
import { modal } from "../../../modules/modal/helpers"

const AddForm = props => {
    return (
        <>
            <div className="modalHeader addEmployee">
                Add Dealership
            </div>
                
            <div className="modal-add--body">
                <label className="name--label">Dealership Name:</label>
                <input onChange={props.handleInputFieldChange} id="business_name" className="modal--input" type="text"/>

                <label className="name--label">City:</label>
                <input onChange={props.handleInputFieldChange} id="city" className="modal--input" type="text"/>

                <StateSelectDropdown 
                    state={props.newDealership}
                />

                <label className="name--label">Phone:</label>
                <input onChange={props.handleInputFieldChange} id="phone" className="modal--input" type="text"/>
                {props.errors.phone !== '' ? <span className="errorMessage">{props.errors.phone}</span> : null}

                <label className="name--label">Website:</label>
                <input onChange={props.handleInputFieldChange} id="website" className="modal--input" type="text"/>
                {props.errors.website !== '' ? <span className="errorMessage website">{props.errors.website}</span> : null}
            </div>

            <div className="addDealership--btn--container">
                <button onClick={props.handleSubmit} className="modal--addBtn">
                    Submit 
                </button>
                <button 
                    className={`closeBtn ${props.dealershipPosted === true ? "disabled" : ""}`} 
                    disabled={props.dealershipPosted === true ? true : false}
                    onClick={() => modal.handleAddFormClose(props.setCreationView)}
                >
                    Close  
                </button>
            </div>
            
            <SuccessSnackbar 
                dealershipPosted={props.dealershipPosted} 
                setDealershipPosted={props.setDealershipPosted}
            />
        </>
    );
}

export default AddForm;