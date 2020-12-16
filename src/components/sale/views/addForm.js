import React from "react"
import DealershipDropdown from "../../modal/dealershipDropdown";
import VehicleDropdown from "../../modal/vehicleSearch";
import StateSelectDropdown from "../../modal/StateSelect";
import PaymentTypeSelectDropdown from "../../modal/PaymentTypeSelect";
import SuccessSnackbar from "../../modal/snackbar"
import { modal } from "../../../modules/modal/helpers"

const AddForm = props => {
    return (
        <>
            <div className="modalHeader sale">
                Add Sale
            </div>

            <div className="modal-add--body">
                <label>First Name:</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="first_name"
                    className="modal--input"
                    type="text"
                />

                <label>Last Name:</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="last_name"
                    className="modal--input"
                    type="text"
                />

                <label>Email:</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="email"
                    className="modal--input"
                    type="email"

                />
                {props.errors.email !== '' ? <span className="errorMessage">{props.errors.email}</span> : null}

                <label>Phone:</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="phone"
                    className="modal--input"
                    type="text"
                />
                {props.errors.phone !== '' ? <span className="errorMessage">{props.errors.phone}</span> : null}

                <label>Street:</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="street"
                    className="modal--input"
                    type="text"

                />

                <label>City:</label>
                <input
                    type="text"
                    id="city"
                    onChange={props.handleInputFieldChange}
                    className="modal--input"
                />

                <label>Zipcode:</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="zipcode"
                    className="modal--input"
                    type="text"
                />
                {props.errors.zipcode !== '' ? <span className="errorMessage">{props.errors.zipcode}</span> : null}

                <StateSelectDropdown
                    state={props.newSale}
                    setState={props.setNewSale}
                    selectedState={props.selectedState}
                />

                <label>Company Name:</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="company_name"
                    className="modal--input"
                    type="text"
                />

                <label>Purchase Date</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="purchase_date"
                    className="modal--input"
                    type="date"
                />

                <label>Pickup Date</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="pickup_date"
                    className="modal--input"
                    type="date"
                />

                <label >
                    Sale Types:
                </label>
                <select
                    onChange={props.handleInputFieldChange}
                    id="sales_type_id"
                    className="modal--input"
                    defaultValue="0"
                >
                    <option value="0"> Select Type </option>
                    <option value="1"> Purchase </option>
                    <option value="2"> Lease </option>
                </select>

                <PaymentTypeSelectDropdown
                    state={props.newSale}
                    setNewSale={props.setNewSale}
                />

                <DealershipDropdown
                    state={props.newSale}
                    setNewSale={props.setNewSale}
                    selectedDealership={props.selectedDealership}
                    setSelectedDealership={props.setSelectedDealership}
                    postedSale={props.postedSale}
                />

                <VehicleDropdown
                    state={props.newSale}
                    setState={props.setNewSale}
                    setSelectedVehicle={props.setSelectedVehicle}
                    selectedVehicle={props.selectedVehicle}
                    postedSale={props.postedSale}
                />

                <label style={{ marginTop: "20px" }}>Price:</label>
                <div
                    className="modal--input"
                    style={{
                        backgroundColor: "#fff",
                        paddingTop: "4px"
                    }}
                >
                    {props.selectedVehicle ? `$${props.selectedVehicle.price}` : <span style={{ color: 'gray' }}>Select a vehicle</span>}
                </div>

                <label>Deposit:</label>
                <input
                    onChange={props.handleInputFieldChange}
                    type="text"
                    id="deposit"
                    className="modal--input"
                />
                {props.errors.deposit !== '' ? <span className="errorMessage">{props.errors.deposit}</span> : null}

                <SuccessSnackbar
                    postedSale={props.postedSale}
                    setPostedSale={props.setPostedSale}
                />
            </div>

            <div className="addSale--btn--container">
                <button 
                    onClick={props.handleSubmit} 
                    className="addSaleModal--btn"
                >
                    Add Sale
                </button>
                <button 
                    className="closeBtn" 
                    onClick={() => modal.handleAddFormClose(props.setCreationView)}
                >
                    Close
                </button>
            </div>
        </>
    )
}

export default AddForm;