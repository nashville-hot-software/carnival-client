import React, { useState,useEffect } from "react";
import "./card.css";
import Modal from "react-bootstrap/Modal";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import USAStatesArray from "./stateList";
import DealershipDropdown from "../modal/dealershipDropdown";
import VehicleSearch from "../modal/vehicleSearch";
import DataManager from "../../api/dataManager";
const SaleDetailModal = (props) => {
  const [sale, setSale] = useState();
  const [updatedSale, setUpdatedSale] = useState();
  const [editMode, setEditMode] = useState(false);
  const [states, setStates] = useState(USAStatesArray);

  const handleEditMode = () => {
    setEditMode(!editMode);
    const muiSwitch = document.querySelector(".MuiSwitch-switchBase");
    muiSwitch.classList.add("Mui-checked", "PrivateSwitchBase-checked-2");
  };

  var stateToChange = { ...sale };
  // (For edit mode)
  const handleInputFieldChange = (evt) => {
    stateToChange[evt.target.id] = evt.target.value;
  };

  const handleEditSubmit = (evt) => {
    evt.preventDefault();
    if (
      sale.first_name === "" ||
      sale.last_name === "" ||
      sale.email === "" ||
      sale.company_name === "" ||
      sale.phone === "" ||
      sale.dealership_id === "" ||
      sale.sales_type_id === "" ||
      sale.vehicle_id === "" ||
      sale.street === "" ||
      sale.city === "" ||
      sale.state === "" ||
      sale.zipcode === "" ||
      sale.price === "" ||
      sale.deposit === ""
    ) {
      window.alert("Please fill out all the fields");
    } else if (stateToChange !== undefined) {
      setUpdatedSale(stateToChange);
      // NOTE: may need to move these guys to after the PUT (could be clearing form
      // before the PUT... not sure if that will change stateToChange back to null...)
      const inputs = document.querySelectorAll("input");
      const selects = document.querySelectorAll("select");
      inputs.forEach((input) => (input.value = ""));
      selects.forEach((select) => (select.value = "none"));
    }
  };

  const handleDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete Employee #${props.employee.id}?`
      )
    ) {
      DataManager.deleteUserData("sales", props.sale.id).then(
        handleModalClose()
      );
    }
  };

  const handleModalClose = () => {
    setEditMode(!editMode);
    setUpdatedSale();

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
    }, 500);

    const muiSwitch = document.querySelector(".MuiSwitch-switchBase");

    if (muiSwitch.classList.contains("Mui-checked")) {
      muiSwitch.click();
    }
  };
  useEffect(() => {
    DataManager.getOne("sales", props.sale.id).then((data) => {
      setSale(data);
    });
  }, [props.sale]);

  useEffect(() => {
    if (updatedSale !== undefined) {
      DataManager.update("sales", updatedSale, props.sale.id)
        // Later update API to return updated obj on the PUT response instead of re-fetching
        .then(() => {
          DataManager.getOne("sales", props.sales.id).then((data) => {
            console.log(data);
            setUpdatedSale();
            setSale(data);
          });
        })
        .then(() => {
          setEditMode(false);
          const muiSwitch = document.querySelector(".MuiSwitch-switchBase");
          if (muiSwitch.classList.contains("Mui-checked")) {
            muiSwitch.click();
          }
        });
    }
  }, [updatedSale]);
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
                control={<Switch onClick={handleEditMode} color="#ced5f7" />}
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
            <VehicleSearch />
          </div>
          <div className="addEmployee--btn--container">
            <button onClick={handleEditSubmit} className="updateEmployee--btn">
              Update
            </button>
            <button className="closeBtn" onClick={handleModalClose}>
              Cancel
            </button>
          </div>
        </>
      )}
    </>
  );
};
export default SaleDetailModal;
