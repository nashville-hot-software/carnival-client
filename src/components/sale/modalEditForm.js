import React, { useState } from "react";
import "./card.css";
import Modal from "react-bootstrap/Modal";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import USAStatesArray from "./stateList";
import DealershipDropdown from "../modal/dealershipDropdown";
import VehicleSearch from "../modal/vehicleSearch"
const SaleDetailModal = (props) => {
    // employee obj to update (passed down from parent list component)
    const [sale, setSale] = useState({
        price: props.sale.price.price,
        deposit: props.sale.deposit,
        pickup_date: props.sale.pickup_date,
        invoice_number: props.sale.invoice_number,
        payment_method: props.sale.payment_method,
        returned: props.sale.returned,
        dealership_id: props.sale.dealership_id,
        employee_id: props.sale.employee_id,
        sales_type_id: props.sale.sales_type_id,
        vehicle_id: props.sale.vehicle_id,
        first_name: props.sale.first_name,
        last_name: props.sale.last_name,
        email: props.sale.email,
        phone: props.sale.phone,
        street: props.sale.street,
        city: props.sale.city,
        state: props.sale.state,
        zipcode: props.sale.zipcode,
        company_name: props.sale.company_name,
    });
    // State for expanding/hiding the dealership dropdown menu
    const [editMode, setEditMode] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [states, setStates] = useState(USAStatesArray);

    const handleEditMode = () => {
        setEditMode(!editMode);
    }
        const handleClose = () => {
            setEditMode(false);
            const inputs = document.querySelectorAll("input");
            const selects = document.querySelectorAll("select");

            inputs.forEach((input) => (input.value = ""));
            selects.forEach((select) => (select.value = "none"));

            document.querySelector(".modal-bg").classList.add("fade-out");
            document.querySelector(".modal-box").classList.add("fade-out");

            setTimeout(function () {
                document.querySelector(".modal-box").classList.remove("fade-out");
                document.querySelector(".modal-bg").classList.remove("fade-out");
                document.querySelector(".modal-box").classList.remove("show");
                document.querySelector(".modal-bg").classList.remove("show");
            }, 1000);

            const muiSwitch = document.querySelector(".MuiSwitch-switchBase");

            if (muiSwitch.classList.contains("Mui-checked")) {
                muiSwitch.click();
            }
        }

            const handleEditMode = () => {
                setEditMode(!editMode);
                const muiSwitch = document.querySelector(".MuiSwitch-switchBase");
                muiSwitch.classList.add("Mui-checked", "PrivateSwitchBase-checked-2");
                console.log(muiSwitch);
            };

            // (For edit mode)
            const handleInputFieldChange = (evt) => {
                const stateToChange = { ...sale };
                stateToChange[evt.target.id] = evt.target.value;
                setSale(stateToChange);
            };

           
            const handleDropdownClose = () => setOpen(false);

            const handleEditSubmit = () => {
                if (sale.first_name === "" && sale.last_name === "") {
                    window.alert("Please fill out new customer name fields");
                } else if (sale.email === "") {
                    window.alert("Please enter customers email address");
                } else if (sale.company_name === "") {
                    window.alert("Please enter customers email address");
                } else if (sale.phone === "") {
                    window.alert("Please enter a valid phone number");
                } else if (sale.dealership_id === 0) {
                    window.alert("Please select a valid dealership");
                } else if (sale.sales_type_id === 0) {
                    window.alert("Please select a valid employee type");
                } else if (sale.vehicle_id === 0) {
                    window.alert("Please select a valid vehicle");
                } else if (sale.street === 0) {
                    window.alert("Please select a valid vehicle");
                } else if (sale.city === 0) {
                    window.alert("Please select a valid vehicle");
                } else if (sale.state === "") {
                    window.alert("Please select a valid vehicle");
                } else if (sale.zipcode === "") {
                    window.alert("Please select a valid vehicle");
                } else if (sale.price === "") {
                    window.alert("Please select a valid vehicle");
                } else if (sale.price === "") {
                    window.alert("Please select a valid vehicle");
                } else {
                    DataManager.update("sales", sale, props.sale.id).then(() => {
                        setEditMode(false);
                    });
                }
            };
    return (
            <>
                    <div className="modalHeader">
                        <div className="employee-details--header">
                            <span>Sale</span>
                            <span className="employee-id">#{props.sale.id}</span>
                        </div>

                        <div className="edit--switch">
                            <FormControl component="fieldset">
                                <FormGroup aria-label="position" row>
                                    <FormControlLabel
                                        value="Edit"
                                        control={
                                            <Switch onClick={handleEditMode} color="#ced5f7" />
                                        }
                                        label="Update Sale"
                                        labelPlacement="top"
                                    />
                                </FormGroup>
                            </FormControl>
                        </div>
                        {/* <ul>
                  <li class="ele">
                      <div
                          type="button"
                          onClick={handleClose}
                          className="x spin large "
                      >
                          <b></b>
                          <b></b>
                          <b></b>
                          <b></b>
                      </div>
                  </li>
              </ul> */}
                    </div>

                    
                    {editMode === false ? (
                        <div className="modal-details--body">
                            <strong>Name:</strong>{" "}
                            {`${props.sale.first_name} ${props.sale.last_name}`}
                            <strong>Price:</strong> {`${props.sale.price.price}`}
                            <strong>Deposit:</strong> {`${props.sale.deposit}`}
                            <strong>Pickup Date:</strong> {`${props.sale.pickup_date}`}
                            <strong>Email:</strong> {`${props.sale.email_address}`}
                            <strong>InvoiceNumber:</strong> {`${props.sale.invoice_number}`}
                            <strong>Payment Method:</strong> {`${props.sale.payment_method}`}
                            <strong>returned:</strong> {`${props.sale.returned}`}
                            <strong>Phone:</strong> {`${props.sale.phone}`}
                            <strong>Company Name:</strong> {`${props.sale.company_name}`}
                            <strong>employee Id:</strong> {`${props.sale.employee_id}`}
                            <strong>City:</strong> {`${props.sale.city}`}
                            <strong>State:</strong> {`${props.sale.state}`}
                            <strong>zipcode:</strong> {`${props.sale.zipcode}`}
                            <strong>City:</strong> {`${props.sale.city}`}
                            <strong>sales type id:</strong> {`${props.sale.sales_type_id}`}
                            <strong>Vehicle Id:</strong> {`${props.sale.vehicle_id}`}
                            <strong>Dealership:</strong> {`${props.sale.dealership_id}`}
                        </div>
                    ) : (
                    <>
                    <div className="modal-details--body">
                        <label className="name--label">First Name:</label>
                        <input
                            onChange={handleInputFieldChange}
                            id="first_name"
                            className="modal--input"
                            type="text"
                        />

                        <label className="name--label">Last Name:</label>
                        <input
                            onChange={handleInputFieldChange}
                            id="last_name"
                            className="modal--input"
                            type="text"
                        />

                        <label className="name--label">Email:</label>
                        <input
                            onChange={handleInputFieldChange}
                            id="email"
                            className="modal--input"
                            type="text"
                        />

                        <label className="name--label">Phone:</label>
                        <input
                            onChange={handleInputFieldChange}
                            id="phone"
                            className="modal--input"
                            type="text"
                        />

                        <label className="name--label">Street:</label>
                        <input
                            onChange={handleInputFieldChange}
                            id="street"
                            className="modal--input"
                            type="text"
                        />

                        <label className="name--label">State:</label>
                        <select onChange={handleInputFieldChange} id="state">
                            <option value="">Select a State</option>
                            {states !== undefined
                                ? states.map((state) => {
                                    return <option value={state.id}>{state.name}</option>;
                                })
                                : null}
                        </select>

                        <label className="name--label">City:</label>
                        <input
                            type="text"
                            id="city"
                            onChange={handleInputFieldChange}
                            className="modal--input"
                        />

                        <label className="name--label">Zipcode:</label>
                        <input
                            onChange={handleInputFieldChange}
                            id="zipcode"
                            className="modal--input"
                            type="text"
                        />

                        <label className="name--label">Company Name:</label>
                        <input
                            onChange={handleInputFieldChange}
                            id="company_name"
                            className="modal--input"
                            type="text"
                        />

                        <label>Sale Types:</label>
                        <select
                            onChange={handleInputFieldChange}
                            id="sales_type_id"
                            className="sale-type--select"
                        >
                            <option value="0">Select Type</option>
                            <option value="1">Purchase</option>
                            <option value="2">Lease</option>
                        </select>

                        <label>Deposit:</label>
                        <input
                            type="text"
                            placeholder="Deposit"
                            id="deposit"
                            onChange={handleInputFieldChange}
                            className="modal--input"
                        />

                        <label>Pickup Date:</label>
                        <input
                            type="date"
                            id="pickup_date"
                            onChange={handleInputFieldChange}
                        />

                        <label>Payment Method:</label>
                        <select
                            onChange={handleInputFieldChange}
                            id="payment_method"
                            className="sale-type--select"
                        >
                            <option value="">Select Payment Type</option>
                            <option value="mastercard">Mastercard</option>
                            <option value="visa">Visa</option>
                            <option value="americanexpress">American Express</option>
                            <option value="discover">Discover</option>
                            <option value="capitalone">Capital One</option>
                        </select>

                        {/* This block is for the dealership search dropdown menu (lines 157-184) */}
                        <DealershipDropdown state={sale} setState={setSale} />
                        <VehicleSearch/>    
                    </div>
                    <div className="addEmployee--btn--container">
                        <button onClick={handleEditSubmit} className="updateEmployee--btn">
                            Update
                        </button>
                        <button className="closeBtn" onClick={handleClose}>
                            Cancel
                        </button>
                    </div>
                    </>
                 )}
    </>
    
    );

}
export default SaleDetailModal;
