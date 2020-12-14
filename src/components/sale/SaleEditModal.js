import React, { useState, useEffect } from "react";
import "../../styles/sales/card.css"
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import DataManager from "../../api/dataManager";
import StateSelectDropdown from "../modal/StateSelect";
import PaymentTypeSelectDropdown from "../modal/PaymentTypeSelect";
import Input from "../saleInput/Input";
import { errorHandler, validateForm } from "../validation/formValidator"
import { modal } from "../../modules/modal/helpers"

const SaleEditModal = (props) => {
  const [sale, setSale] = useState();
  const [selectedState, setSelectedState] = useState();
  const [selectedPaymentType, setSelectedPaymentType] = useState();
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    zipcode: '',
    price: '',
    deposit: ''
  });

  const handleInputFieldChange = (evt) => {
    errorHandler(evt.target.id, evt.target.value, errors, setErrors);

    var stateToChange = { ...sale };
    stateToChange[evt.target.id] = evt.target.value;
    setSale(stateToChange);
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
      alert("Please fill out all the fields");
    } else if (sale !== undefined) {
      if (validateForm(errors)) {
        DataManager.update("sales", sale, props.sale.id)
        // Later update API to return updated obj on the PUT response instead of re-fetching
        .then(() => {
          DataManager.getOne("sales", props.sale.id).then((data) => {
            console.log(data[0]);
            setSale(data[0]);
          });
        })
        .then(() => {
          modal.clearForm();
          props.setEditMode(false);
          const muiSwitch = document.querySelector(".MuiSwitch-switchBase");
          if (muiSwitch.classList.contains("Mui-checked")) {
            muiSwitch.click();
          }
        });
      }else {
        alert("Please fix form entries")
      }
    }
  };

  useEffect(() => {
    DataManager.getOne("sales", props.sale.id).then((data) => {
      setSale(data[0]);
      setSelectedState(data.state);
      setSelectedPaymentType(data.payment_method);
    });
  }, [props.sale]);

  return (
    <>
      <div className="modalHeader saleEdit--header">
        <div className="employee-details--header">
          <span>Sale</span>
          <span className="employee-id">#{props.sale.id}</span>
        </div>
        <div className="edit--switch">
          <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="Edit"
                control={<Switch onClick={() => modal.handleEditMode(props.editMode,props.setEditMode)} color="#ced5f7" />}
                label="Update Sale"
                labelPlacement="top"
              />
            </FormGroup>
          </FormControl>
        </div>
      </div>

      {props.editMode === false ? (
        <>
          <div className="modal-details--body">
            <div>
              <strong>Name:</strong>
              {sale !== undefined ? (`${sale.first_name} ${sale.last_name}`) : (`${props.sale.first_name} ${props.sale.last_name}`)}
            </div>

            <div>
              <strong>Price:</strong>
              {sale !== undefined ? (sale.price) : (props.sale.price)}
            </div>

            <div>
              <strong>Deposit:</strong>
              {sale !== undefined ? (sale.deposit) : (props.sale.deposit)}
            </div>

            <div>
              <strong>Pickup Date:</strong>
              {sale !== undefined ? (sale.pickup_date) : (props.sale.pickup_date)}
            </div>

            <div>
              <strong>Email:</strong>
              {sale !== undefined ? (sale.email) : (props.sale.email)}
            </div>

            <div>
              <strong>InvoiceNumber:</strong>
              {sale !== undefined ? (sale.invoice_number) : (props.sale.invoice_number)}
            </div>

            <div>
              <strong>Payment Method:</strong>
              {sale !== undefined ? (sale.payment_method) : (props.sale.payment_method)}
            </div>

            <div>
              <strong>returned:</strong>
              {sale !== undefined ? (sale.returned) : (props.sale.returned)}
            </div>

            <div>
              <strong>Phone:</strong>
              {sale !== undefined ? (sale.phone) : (props.sale.phone)}
            </div>

            <div>
              <strong>Company Name:</strong>
              {sale !== undefined ? (sale.company_name) : (props.sale.company_name)}
            </div>

            <div>
              <strong>employee Id:</strong>
              {sale !== undefined ? (sale.employee_id) : (props.sale.employee_id)}
            </div>

            <div>
              <strong>City:</strong>
              {sale !== undefined ? (sale.city) : (props.sale.city)}
            </div>

            <div>
              <strong>State:</strong>
              {sale !== undefined ? (sale.state) : (props.sale.state)}
            </div>

            <div>
              <strong>zipcode:</strong>
              {sale !== undefined ? (sale.zipcode) : (props.sale.zipcode)}
            </div>

            <div>
              <strong>City:</strong>
              {sale !== undefined ? (sale.city) : (props.sale.city)}
            </div>

            <div>
              <strong>sales type id:</strong>
              {sale !== undefined ? (sale.sales_type_id) : (props.sale.sales_type_id)}
            </div>

            <div>
              <strong>Vehicle Id:</strong>
              {sale !== undefined ? (sale.vehicle_id) : (props.sale.vehicle_id)}
            </div>

            <div>
              <strong>Dealership:</strong>
              {sale !== undefined ? (sale.dealership_id) : (props.sale.dealership_id)}
            </div>
          </div>
          <div className="saleDetails--btn--container">
            <button className="closeBtn" onClick={() => modal.handleEditFormClose(props.setEditMode)}>
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
                errors={errors}
                sale={props.sale}
              />
              <Input.Phone
                handleInputFieldChange={handleInputFieldChange}
                {...props}
                errors={errors}
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
                errors={errors}
                sale={props.sale}
              />
              <StateSelectDropdown
                state={sale}
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
                errors={errors}
                sale={props.sale}
              />
              <Input.Price
                handleInputFieldChange={handleInputFieldChange}
                {...props}
                errors={errors}
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
              <label style={{ marginTop: "20px" }}>Sale Types:</label>
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
                state={sale}
                setSale={setSale}
              />
            </div>
            <div className="saleEdit--btn--container">
              <button
                onClick={handleEditSubmit}
                className="updateEmployee--btn"
              >
                Update
              </button>
              <button className="closeBtn" onClick={() => modal.handleEditFormClose(props.setEditMode)}>
                Cancel
              </button>
            </div>
          </>
        )}
    </>
  );
};
export default SaleEditModal;
