import React, { useState } from "react";
import DataManager from "../../api/dataManager";
import DealershipDropdown from "../modal/dealershipDropdown";
import VehicleDropdown from "../modal/vehicleSearch";
import StateSelectDropdown from "../modal/StateSelect";
import Input from "../saleInput/Input";
import PaymentTypeSelectDropdown from "../modal/PaymentTypeSelect";
import SuccessSnackbar from "../modal/snackbar"
import "./list.css";

const AddSaleForm = (props) => {
    const [newSale, setNewSale] = useState({
        price: 0.0,
        deposit: 0,
        pickup_date: "",
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
        selects.forEach((select) => (select.value = "0"));
    };

    const handleSubmit = () => {
        console.log(newSale)
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

        if (evt.target.id === 'deposit') {
            let value = evt.target.value;
            
            if (value.includes('$') && value.includes(',')) {
                const splitPrice = value.split('$');
                value = splitPrice[1];
                const secondSplitPrice = value.split(',');
                value = secondSplitPrice.join('');
            } else if (value.includes(',')) {
                const splitPrice = value.split(',');
                value = splitPrice.join('');
            } else if (value.includes('$')) {
                const splitPrice = value.split('$');
                value = splitPrice.join('');
            } 

            stateToChange.deposit = parseInt(value);
        } 

        
        stateToChange[evt.target.id] = evt.target.value;
        setNewSale(stateToChange);
    };

    return (
    <>
        <div className="modalHeader sale">
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
        <div className="modal-add--body">

            <Input.FirstName handleInputFieldChange={handleInputFieldChange}/>
            <Input.LastName handleInputFieldChange={handleInputFieldChange}/>
            <Input.Email handleInputFieldChange={handleInputFieldChange}/>
            <Input.Phone handleInputFieldChange={handleInputFieldChange}/>
            <Input.Street handleInputFieldChange={handleInputFieldChange}/>
            <Input.City handleInputFieldChange={handleInputFieldChange}/>
            <Input.ZipCode handleInputFieldChange={handleInputFieldChange}/>
            <StateSelectDropdown
                state={newSale}
                selectedState={selectedState}
                setState={setNewSale}
            />
            <Input.CompanyName handleInputFieldChange={handleInputFieldChange}/>
            
            <Input.PurchaseDate handleInputFieldChange={handleInputFieldChange}/>
            <Input.PickupDate handleInputFieldChange={handleInputFieldChange}/>

            <label > 
                Sale Types: 
            </label>
            <select
                onChange={handleInputFieldChange}
                id="sales_type_id"
                className="modal--input"
                defaultValue="0"
            >
                <option value="0"> Select Type </option>
                <option value="1"> Purchase </option>
                <option value="2"> Lease </option>
            </select>

            <PaymentTypeSelectDropdown
                state={newSale}
                setNewSale={setNewSale}
            />
            <DealershipDropdown
                state={newSale}
                setNewSale={setNewSale}
                selectedDealership={selectedDealership}
                setSelectedDealership={setSelectedDealership}
                postedSale={postedSale} 
            />
            <VehicleDropdown
                state={newSale}
                setState={setNewSale}
                setSelectedVehicle={setSelectedVehicle}
                selectedVehicle={selectedVehicle}
                postedSale={postedSale}
            />
            <Input.Price selectedVehicle={selectedVehicle} handleInputFieldChange={handleInputFieldChange} />
            <Input.Deposit handleInputFieldChange={handleInputFieldChange}/>

            <SuccessSnackbar 
                postedSale={postedSale} 
                setPostedSale={setPostedSale}
            />
        </div>
        <div className="addSale--btn--container">
            <button onClick={handleSubmit} className="addSaleModal--btn">Add Sale</button>
            <button className="closeBtn" onClick={handleClose}> Close</button>
        </div>
    </>
);
};
export default AddSaleForm;
