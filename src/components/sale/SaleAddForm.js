import React, { useState } from "react";
import DataManager from "../../api/dataManager";
import DealershipDropdown from "../modal/dealershipDropdown";
import VehicleSearch from "../modal/vehicleSearch";
import StateSelectDropdown from "../modal/StateSelect";
import Input from "../saleInput/Input";
import PaymentTypeSelectDropdown from "../modal/PaymentTypeSelect";
import SuccessSnackbar from "../modal/snackbar"

import "./list.css";
const AddSaleForm = (props) => {
    // const [sales, setSales] = useState();
    const [newSale, setNewSale] = useState({
        price: 0.0,
        deposit: 0,
        pickup_date: "",
        invoice_number: "",
        payment_method: "",
        returned: false,
        dealership_id: 0,
        employee_id: 1,
        sales_type_id: 0,
        vehicle_id: 0,
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        company_name: "",
    });
    const [postedSale, setPostedSale] = useState();
    const [selectedDealership, setSelectedDealership] = useState("");
    const [selectedVehicle, setSelectedVehicle] = useState("");
    const [selectedState, setSelectedState] = useState();
    const [selectedPaymentType, setSelectedPaymentType] = useState();

    const handleClose = () => {
        clearForm();
        document.querySelector(".modal-box").classList.remove("show");
        setTimeout(() => {
            document.querySelector(".modal-bg").classList.remove("show");
        }, 300);
        setTimeout(function () {
            props.setCreationView(false);
        }, 700);
    };
    const clearForm = () => {
        const inputs = document.querySelectorAll("input");
        const selects = document.querySelectorAll("select");
        inputs.forEach((input) => (input.value = ""));
        selects.forEach((select) => (select.value = "none"));
    };

    const handleSubmit = () => {
        if (
            newSale.first_name === "" ||
            newSale.last_name === "" ||
            newSale.email === "" ||
            newSale.company_name === "" ||
            newSale.phone === "" ||
            newSale.dealership_id === "" ||
            newSale.sales_type_id === "" ||
            newSale.vehicle_id === "" ||
            newSale.street === "" ||
            newSale.city === "" ||
            newSale.state === "" ||
            newSale.zipcode === "" ||
            newSale.price === "" ||
            newSale.deposit === ""
        ) {
            alert("Please fill out all the fields");
        } else {
            DataManager.PostData("sales", newSale).then((data) => {
                setNewSale({
                    price: 0.0,
                    deposit: 0,
                    pickup_date: "",
                    invoice_number: "",
                    payment_method: "",
                    returned: false,
                    dealership_id: 0,
                    employee_id: 1,
                    sales_type_id: 0,
                    vehicle_id: 0,
                    first_name: "",
                    last_name: "",
                    email: "",
                    phone: "",
                    street: "",
                    city: "",
                    state: "",
                    zipcode: "",
                    company_name: "",
                });
                setPostedSale(data);
                clearForm();
                setSelectedDealership("");
                setSelectedVehicle("")
            });
        }
    };

    const handleInputFieldChange = (evt) => {
        const stateToChange = {...newSale}
        stateToChange[evt.target.id] = evt.target.value;
        setNewSale(stateToChange);
    };
    return (
<>
    <div className="modalHeader">
        Add Sale
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

        <Input.FirstName handleInputFieldChange={handleInputFieldChange}{...props}sale={newSale}/>
        <Input.LastName handleInputFieldChange={handleInputFieldChange}{...props}sale={newSale}/>
        <Input.Email handleInputFieldChange={handleInputFieldChange}{...props}sale={newSale}/>
        <Input.Phone handleInputFieldChange={handleInputFieldChange}{...props}sale={newSale}/>
        <Input.Street handleInputFieldChange={handleInputFieldChange}{...props}sale={newSale}/>
        <Input.City handleInputFieldChange={handleInputFieldChange}{...props}sale={newSale}/>
        <Input.ZipCode handleInputFieldChange={handleInputFieldChange}{...props}sale={newSale}/>
        <Input.CompanyName handleInputFieldChange={handleInputFieldChange}{...props}sale={newSale}/>
        <Input.Deposit handleInputFieldChange={handleInputFieldChange}{...props}newSale={newSale}/>
        <Input.Price handleInputFieldChange={handleInputFieldChange}{...props} newSale={newSale}/>
        <Input.PurchaseDate handleInputFieldChange={handleInputFieldChange}{...props}newSale={newSale}/>
        <Input.PickupDate handleInputFieldChange={handleInputFieldChange}{...props}newSale={newSale}/>

        <StateSelectDropdown
        state={newSale}
        selectedState={selectedState}
        setNewEmployee={setNewSale}/>

        <label> Sale Types: </label>
        <select
            onChange={handleInputFieldChange}
            id="sales_type_id"
            className="sale-type--select"
        >
            <option value="0"> Select Type </option>
            <option value="1"> Purchase </option>
            <option value="2"> Lease </option>
        </select>
        <PaymentTypeSelectDropdown
            selectedPaymentType={selectedPaymentType}
            state={newSale}
            setNewSale={setNewSale}
        />
        <DealershipDropdown
            state={newSale}
            setNewSale={setNewSale}
            selectedDealership={selectedDealership}
            setSelectedDealership={setSelectedDealership}
            postedSale={postedSale} />
        <div className="addSale--btn--container">
            <button onClick={handleSubmit} className="addEmployee--btn">Add Sale</button>
            <button className="closeBtn" onClick={handleClose}> Close</button>
        </div>
        <SuccessSnackbar 
        postedSale={postedSale} 
        setPostedSale={setPostedSale}
    />
    </div>
</>
);
};
export default AddSaleForm;
