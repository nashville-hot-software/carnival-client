import React, { useState } from "react";
import EmployeeManager from "../../api/dataManager";
import "./card.css";
import Modal from "react-bootstrap/Modal";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

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
    const [open, setOpen] = useState(false);
    const [selectedDealership, setSelectedDealership] = useState("");
    const [query, setQuery] = useState("");
    const [dealerships, setDealerships] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [employee, setEmployee] = useState(props.employee);
    const [dealerships, setDealerships] = useState([]);
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEditMode = () => {

        setEditMode(!editMode)
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
        };

        const handleDealershipDropdownClose = () => setOpen(false);

        const handleEditMode = () => {
            fetchEmployeeTypes();
            setEditMode(!editMode);
        };

        // (For edit mode)
        const handleFieldChange = (evt) => {
            const stateToChange = { ...employee };
            stateToChange[evt.target.id] = evt.target.value;
            setEmployee(stateToChange);
        };

        const handleDealershipSearch = (evt) => {
            setQuery(evt.target.value);

            if (evt.target.value.length > 0 && selectedDealership === "") {
                EmployeeManager.getAll(
                    "dealerships",
                    "searchTerm",
                    evt.target.value
                ).then((matchedDealerships) => {
                    setDealerships(matchedDealerships);
                });

                setOpen(true);
            } else if (selectedDealership !== "") {
                setSelectedDealership(evt.target.value);
            } else {
                setDealerships([]);

                setOpen(false);
            }
        };

        const handleDealerSelect = (evt) => {
            const stateToChange = { ...employee };
            stateToChange.dealership_id = parseInt(evt.target.id);
            setEmployee(stateToChange);

            setSelectedDealership(evt.target.innerHTML);

            const dropdownDiv = document.querySelector(".dealership-list--dropdown");
            dropdownDiv.scrollTop = 0;
        };

        const fetchEmployeeTypes = () => {
            EmployeeManager.getAll("employeetypes").then((employeeTypes) => {
                setEmployeeTypes(employeeTypes);
            });
        };

        const handleEmployeeTypeSelect = (evt) => {
            const stateToChange = { ...employee };
            stateToChange.employee_type_id = parseInt(evt.target.value);
            setEmployee(stateToChange);
        };

        const handleEditSubmit = () => {
            if (newSale.first_name === "" && newSale.last_name === "") {
                window.alert("Please fill out new customer name fields")
            } else if (newSale.email === "") {
                window.alert("Please enter customers email address")
            } else if (newSale.company_name === "") {
                window.alert("Please enter customers email address")
            } else if (newSale.phone === "") {
                window.alert("Please enter a valid phone number")
            } else if (newSale.dealership_id === 0) {
                window.alert("Please select a valid dealership")
            } else if (newSale.sales_type_id === 0) {
                window.alert("Please select a valid employee type")
            } else if (newSale.vehicle_id === 0) {
                window.alert("Please select a valid vehicle")
            } else if (newSale.street === 0) {
                window.alert("Please select a valid vehicle")
            } else if (newSale.city === 0) {
                window.alert("Please select a valid vehicle")
            } else if (newSale.state === "") {
                window.alert("Please select a valid vehicle")
            } else if (newSale.zipcode === "") {
                window.alert("Please select a valid vehicle")
            } else if (newSale.price === "") {
                window.alert("Please select a valid vehicle")
            } else if (newSale.price === "") {
                window.alert("Please select a valid vehicle")
            } else {
                EmployeeManager.update("sales", employee, props.employee.id).then(
                    () => {
                        setEditMode(false);
                    }
                );
            }
        };

        return (
            <>
                <div className="modalHeader">
                    Employee
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




                <div className="modalBody">

                    <label className="name--label">First Name:</label>
                    <input onChange={handleInputFieldChange} id="first_name" className="modal--input" type="text" />

                    <label className="name--label">Last Name:</label>
                    <input onChange={handleInputFieldChange} id="last_name" className="modal--input" type="text" />

                    <label className="name--label">Email:</label>
                    <input onChange={handleInputFieldChange} id="email" className="modal--input" type="text" />

                    <label className="name--label">Phone:</label>
                    <input onChange={handleInputFieldChange} id="phone" className="modal--input" type="text" />

                    <label className="name--label">Street:</label>
                    <input onChange={handleInputFieldChange} id="street" className="modal--input" type="text" />

                    <label className="name--label">State:</label>
                    <select
                        onChange={handleInputFieldChange}
                        id="state"
                    >
                        <option value="">Select a State</option>
                        {states !== undefined ? states.map(state => {
                            return (<option value={state.id}>{state.name}</option>)
                        }) : null}
                    </select>

                    <label className="name--label">City:</label>
                    <input
                        type="text"
                        id="city"
                        onChange={handleInputFieldChange}
                        className="modal--input"
                    />


                    <label className="name--label">Zipcode:</label>
                    <input onChange={handleInputFieldChange} id="zipcode" className="modal--input" type="text" />

                    <label className="name--label">Company Name:</label>
                    <input onChange={handleInputFieldChange} id="company_name" className="modal--input" type="text" />


                    <label>Sale Types:</label>
                    <select onChange={handleInputFieldChange} id="sales_type_id" className="sale-type--select">
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
                    <select onChange={handleInputFieldChange} id="payment_method" className="sale-type--select">
                        <option value="">Select Payment Type</option>
                        <option value="mastercard">Mastercard</option>
                        <option value="visa">Visa</option>
                        <option value="americanexpress">American Express</option>
                        <option value="discover">Discover</option>
                        <option value="capitalone">Capital One</option>
                    </select>


                    {/* This block is for the dealership search dropdown menu (lines 157-184) */}
                    <label className="name--label dealership--label">Dealership:</label>
                    <div onBlur={handleDropdownClose} className={`modal--input dealership-list--dropdown ${open ? 'open' : ''}`}>
                        <input
                            className="dealership--search"
                            type="text"
                            onChange={handleDealershipSearch}
                            placeholder="Search Dealerships"
                            value={`${selectedDealership !== "" ? selectedDealership : query}`}
                        />
                        {dealerships.length > 0 ? (
                            <div className="dealerships-results--container">
                                {dealerships.map(dealership => {
                                    return (
                                        <>
                                            <div
                                                className={"dealership--select"}
                                                id={dealership.id}
                                                onClick={handleDealerSelect}
                                            >
                                                {dealership.business_name}
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        ) : null}
                    </div>
                    {/* </Modal.Body> */}

                    <label className="name--label">Select Vehicle:</label>
                    <input className="modal--input" type="text" onChange={handleVehicleSearch} />

                    <div className="sub-modal--container">
                        {showVehicles === true && vehicles.length > 0 ? (
                            // <div>Select a Vehicle</div>

                            // the handle close on blur should close modal but I think this needs
                            // to be on a div outside of the ternary..
                            <div onBlur={handleCloseVehicleSearch} className={`vehicles--dropdown ${showVehicles ? 'open' : ''}`}>
                                {vehicles.map(vehicle => {
                                    return (
                                        <>
                                            <div
                                                className="vehicles--select"
                                                id={vehicle.id}
                                                title={vehicle.floor_price}
                                                onClick={handleVehicleSelect}
                                            >
                                                {`${vehicle.make} ${vehicle.model}`}
                                                <span
                                                    className="vin"
                                                    id={vehicle.id}
                                                    title={vehicle.floor_price}
                                                    type="button disabled"

                                                >
                                                    #{vehicle.vin}
                                                </span>
                                            </div>
                                        </>
                                    )
                                })}
                            </div>
                        ) : null}
                    </div>

                    {/* <Modal.Body> */}
                    <button onClick={handleSubmit} className="addEmployee--btn">
                        Submit
                                </button>
                    {/* </Modal.Body> */}
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
                        <div className="modal-edit--body">
                            <label>
                                <strong>First Name:</strong>
                            </label>
                            <input
                                type="text"
                                id="first_name"
                                placeholder={`${props.sale.first_name}`}
                                onChange={handleFieldChange}
                                className="inputField"
                            />

                            <label>
                                <strong>Last Name:</strong>
                            </label>
                            <input
                                type="text"
                                id="last_name"
                                placeholder={`${props.sale.last_name}`}
                                onChange={handleFieldChange}
                                className="inputField"
                            />

                            <label>
                                <strong>Email:</strong>
                            </label>
                            <input
                                type="text"
                                id="email_address"
                                placeholder={`${props.sale.email_address}`}
                                onChange={handleFieldChange}
                                className="inputField"
                            />

                            <label>
                                <strong>Phone:</strong>
                            </label>
                            <input
                                type="text"
                                id="phone"
                                placeholder={`${props.sale.phone}`}
                                onChange={handleFieldChange}
                                className="inputField"
                            />

                            <label className="name--label dealership--label">Dealership:</label>
                            <div
                                onBlur={handleDealershipDropdownClose}
                                className={`dealership-list--dropdown ${open ? "open" : ""}`}
                            >
                                <input
                                    type="text"
                                    className="dealership--search"
                                    onChange={handleDealershipSearch}
                                    placeholder={`${props.sale.business_name}`}
                                    value={`${selectedDealership !== "" ? selectedDealership : query
                                        }`}
                                />

                                {dealerships !== undefined && dealerships.length > 0 ? (
                                    <div className="dealerships-results--container">
                                        {dealerships.map((dealership) => {
                                            return (
                                                <>
                                                    <div
                                                        className="dealership--select"
                                                        id={dealership.id}
                                                        onClick={handleDealerSelect}
                                                    >
                                                        {dealership.business_name}
                                                    </div>
                                                </>
                                            );
                                        })}
                                    </div>
                                ) : null}
                            </div>

                            {showVehicles === true && vehicles.length > 0 ? (
                                // <div>Select a Vehicle</div>

                                // the handle close on blur should close modal but I think this needs
                                // to be on a div outside of the ternary..
                                <div onBlur={handleCloseVehicleSearch} className={`vehicles--dropdown ${showVehicles ? 'open' : ''}`}>
                                    {vehicles.map(vehicle => {
                                        return (
                                            <>
                                                <div
                                                    className="vehicles--select"
                                                    id={vehicle.id}
                                                    title={vehicle.floor_price}
                                                    onClick={handleVehicleSelect}
                                                >
                                                    {`${vehicle.make} ${vehicle.model}`}
                                                    <span
                                                        className="vin"
                                                        id={vehicle.id}
                                                        title={vehicle.floor_price}
                                                        type="button disabled"

                                                    >
                                                        #{vehicle.vin}
                                                    </span>
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>
                            ) : null}

                            <button onClick={handleSubmit} className="updateEmployee--btn">
                                Update
          </button>
                        </div>
                    )}
                <button className="closeBtn" onClick={handleClose}>
                    Cancel
      </button>
                <div className="edit--switch">
                    <FormControl component="fieldset">
                        <FormGroup aria-label="position" row>
                            <FormControlLabel
                                value="Edit"
                                control={<Switch onClick={handleEditMode} color="primary" />}
                                label="Update"
                                labelPlacement="top"
                            />
                        </FormGroup>
                    </FormControl>
                </div>
            </>
        );
    };

    export default SaleDetailModal;
