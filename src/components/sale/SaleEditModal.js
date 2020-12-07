import React, { useState, useEffect } from "react";
import "./card.css";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import DataManager from "../../api/dataManager";
import StateSelectDropdown from "../modal/StateSelect";
import PaymentTypeSelectDropdown from "../modal/PaymentTypeSelect";
import Input from "../saleInput/Input";

const SaleEditModal = (props) => {
  const [sale, setSale] = useState();
  const [updatedSale, setUpdatedSale] = useState();
  const [selectedState, setSelectedState] = useState();
  const [selectedPaymentType, setSelectedPaymentType] = useState();

  const handleEditMode = () => {
    props.setEditMode(!props.editMode);
    const muiSwitch = document.querySelector(".MuiSwitch-switchBase");
    muiSwitch.classList.add("Mui-checked", "PrivateSwitchBase-checked-2");
  };

  var stateToChange = { ...sale };

  const handleInputFieldChange = (evt) => {
    console.log(stateToChange);
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
      
      const inputs = document.querySelectorAll("input");
      const selects = document.querySelectorAll("select");
      
      inputs.forEach((input) => (input.value = ""));
      selects.forEach((select) => (select.value = "none"));
    }
  };

  const handleModalClose = () => {
    props.setEditMode(false);
    setUpdatedSale();

    const inputs = document.querySelectorAll("input");
    const selects = document.querySelectorAll("select");

    inputs.forEach((input) => (input.value = ""));
    selects.forEach((select) => (select.value = "none"));

    document.querySelector(".modal-box").classList.remove("show");

    setTimeout(() => {
      props.setMatchedSale();
      document.querySelector(".modal-bg").classList.remove("show");
    }, 300);

    const muiSwitch = document.querySelector(".MuiSwitch-switchBase");

    if (muiSwitch.classList.contains("Mui-checked")) {
      muiSwitch.click();
    }
  };
  
  useEffect(() => {
    DataManager.getOne("sales", props.sale.id).then((data) => {
      setSale(data[0]);
      console.log(data);
      setSelectedState(data.state);
      setSelectedPaymentType(data.payment_method);
    });
  }, [props.sale]);

  useEffect(() => {
    if (updatedSale !== undefined) {
      console.log("this is updated state", updatedSale);
      DataManager.update("sales", updatedSale, props.sale.id)
        // Later update API to return updated obj on the PUT response instead of re-fetching
        .then(() => {
          DataManager.getOne("sales", props.sale.id).then((data) => {
            console.log(data[0]);
            setUpdatedSale();
            setSale(data[0]);
          });
        })
        .then(() => {
          props.setEditMode(false);
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

      {props.editMode === false ? (
        <>
          <div className="modal-details--body">
            <strong>Name:</strong>
            {sale !== undefined ? (`${sale.first_name} ${sale.last_name}`) : (`${props.sale.first_name} ${props.sale.last_name}`)}
            <strong>Price:</strong> 
            {sale !== undefined ? (sale.price) : (props.sale.price)}
            <strong>Deposit:</strong> 
            {sale !== undefined ? (sale.deposit) : (props.sale.deposit)}
            <strong>Pickup Date:</strong> 
            {sale !== undefined ? (sale.pickup_date) : (props.sale.pickup_date)}
            <strong>Email:</strong> 
            {sale !== undefined ? (sale.email) : (props.sale.email)}
            <strong>InvoiceNumber:</strong> 
            {sale !== undefined ? (sale.invoice_number) : (props.sale.invoice_number)}
            <strong>Payment Method:</strong> 
            {sale !== undefined ? (sale.payment_method) : (props.sale.payment_method)}
            <strong>returned:</strong> 
            {sale !== undefined ? (sale.returned) : (props.sale.returned)}
            <strong>Phone:</strong> 
            {sale !== undefined ? (sale.phone) : (props.sale.phone)}
            <strong>Company Name:</strong> 
            {sale !== undefined ? (sale.company_name) : (props.sale.company_name)}
            <strong>employee Id:</strong> 
            {sale !== undefined ? (sale.employee_id) : (props.sale.employee_id)}
            <strong>City:</strong> 
            {sale !== undefined ? (sale.city) : (props.sale.city)}
            <strong>State:</strong> 
            {sale !== undefined ? (sale.state) : (props.sale.state)}
            <strong>zipcode:</strong> 
            {sale !== undefined ? (sale.zipcode) : (props.sale.zipcode)}
            <strong>City:</strong> 
            {sale !== undefined ? (sale.city) : (props.sale.city)}
            <strong>sales type id:</strong> 
            {sale !== undefined ? (sale.sales_type_id) : (props.sale.sales_type_id)}
            <strong>Vehicle Id:</strong> 
            {sale !== undefined ? (sale.vehicle_id) : (props.sale.vehicle_id)}
            <strong>Dealership:</strong> 
            {sale !== undefined ? (sale.dealership_id) : (props.sale.dealership_id)}
          </div>
          <div className="saleDetails--btn--container">
            <button className="closeBtn" onClick={handleModalClose}>
              Close
            </button>
          </div>
        </>
      ) : (
          <>
            <div className="modal-edit--body">
              <Input.FirstName
                handleInputFieldChange={handleInputFieldChange}
                {...props}
                sale={props.sale}
              />
              <Input.LastName
                handleInputFieldChange={handleInputFieldChange}
                {...props}
                sale={props.sale}
              />
              <Input.Email
                handleInputFieldChange={handleInputFieldChange}
                {...props}
                sale={props.sale}
              />
              <Input.Phone
                handleInputFieldChange={handleInputFieldChange}
                {...props}
                sale={props.sale}
              />
              <Input.Street
                handleInputFieldChange={handleInputFieldChange}
                {...props}
                sale={props.sale}
              />
              <Input.City
                handleInputFieldChange={handleInputFieldChange}
                {...props}
                sale={props.sale}
              />
              <Input.ZipCode
                handleInputFieldChange={handleInputFieldChange}
                {...props}
                sale={props.sale}
              />
              <StateSelectDropdown
                sale={sale}
                selectedState={selectedState}
                setSale={setSale}
              />
              <Input.CompanyName
                handleInputFieldChange={handleInputFieldChange}
                {...props}
                sale={props.sale}
              />
              <Input.Deposit
                handleInputFieldChange={handleInputFieldChange}
                {...props}
                sale={props.sale}
              />
              <Input.Price
                handleInputFieldChange={handleInputFieldChange}
                {...props}
                sale={props.sale}
              />
              <Input.PurchaseDate
                handleInputFieldChange={handleInputFieldChange}
                {...props}
                sale={props.sale}
              />
              <Input.PickupDate
                handleInputFieldChange={handleInputFieldChange}
                {...props}
                sale={props.sale}
              />
              <label style={{marginTop: "20px"}}>Sale Types:</label>
              <select
                onChange={handleInputFieldChange}
                id="sales_type_id"
                className="modal--input"
              >
                <option value="0">Select Type</option>
                <option value="1">Purchase</option>
                <option value="2">Lease</option>
              </select>
              <PaymentTypeSelectDropdown
                selectedPaymentType={selectedPaymentType}
                sale={sale}
                setSale={setSale}
              />
              {/* This block is for the dealership search dropdown menu (lines 157-184) */}
            </div>
            <div className="saleEdit--btn--container">
              <button
                onClick={handleEditSubmit}
                className="updateEmployee--btn"
              >
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
export default SaleEditModal;
