import React from "react"
import StateSelectDropdown from "../../modal/StateSelect";
import PaymentTypeSelectDropdown from "../../modal/PaymentTypeSelect";
import Input from "../../saleInput/Input";
import { modal } from "../../../modules/modal/helpers"

const EditForm = props => {
    return (
        <>
            <div className="modal-edit--body">
                <Input.FirstName
                    handleInputFieldChange={props.handleInputFieldChange}
                    {...props}
                    sale={props.sale}
                />
                <Input.LastName
                    handleInputFieldChange={props.handleInputFieldChange}
                    {...props}
                    sale={props.sale}
                />
                <Input.Email
                    handleInputFieldChange={props.handleInputFieldChange}
                    {...props}
                    errors={props.errors}
                    sale={props.sale}
                />
                <Input.Phone
                    handleInputFieldChange={props.handleInputFieldChange}
                    {...props}
                    errors={props.errors}
                    sale={props.sale}
                />
                <Input.Street
                    handleInputFieldChange={props.handleInputFieldChange}
                    {...props}
                    sale={props.sale}
                />
                <Input.City
                    handleInputFieldChange={props.handleInputFieldChange}
                    {...props}
                    sale={props.sale}
                />
                <Input.ZipCode
                    handleInputFieldChange={props.handleInputFieldChange}
                    {...props}
                    errors={props.errors}
                    sale={props.sale}
                />
                <StateSelectDropdown
                    state={props.sale}
                    setState={props.setSale}
                    selectedState={props.selectedState}
                />
                <Input.CompanyName
                    handleInputFieldChange={props.handleInputFieldChange}
                    {...props}
                    sale={props.sale}
                />
                <Input.Deposit
                    handleInputFieldChange={props.handleInputFieldChange}
                    {...props}
                    errors={props.errors}
                    sale={props.sale}
                />
                <Input.Price
                    handleInputFieldChange={props.handleInputFieldChange}
                    {...props}
                    errors={props.errors}
                    sale={props.sale}
                />
                <Input.PurchaseDate
                    handleInputFieldChange={props.handleInputFieldChange}
                    {...props}
                    sale={props.sale}
                />
                <Input.PickupDate
                    handleInputFieldChange={props.handleInputFieldChange}
                    {...props}
                    sale={props.sale}
                />
                <label style={{ marginTop: "20px" }}>Sale Types:</label>
                <select
                    onChange={props.handleInputFieldChange}
                    id="sales_type_id"
                    className="modal--input"
                >
                    <option value="0">Select Type</option>
                    <option value="1">Purchase</option>
                    <option value="2">Lease</option>
                </select>
                <PaymentTypeSelectDropdown
                    selectedPaymentType={props.selectedPaymentType}
                    state={props.sale}
                    setSale={props.setSale}
                />
                </div>
                <div className="saleEdit--btn--container">
                <button
                    onClick={props.handleEditSubmit}
                    className="updateEmployee--btn"
                >
                    Update
                </button>
                <button className="closeBtn" onClick={() => modal.handleEditFormClose(props.setEditMode)}>
                    Cancel
                </button>
            </div>
        </>
    )
}

export default EditForm;