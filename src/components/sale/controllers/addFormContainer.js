import React, { useState } from "react";
import DataManager from "../../../api/dataManager";
import "../../../styles/sales/list.css"
import { errorHandler, validateForm } from "../../validation/formValidator"
import { modal } from "../../../modules/modal/helpers"
import AddForm from "../views/addForm"

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
    const [postedSale, setPostedSale] = useState();
    const [selectedDealership, setSelectedDealership] = useState("");
    const [selectedVehicle, setSelectedVehicle] = useState("");
    const [selectedState, setSelectedState] = useState();

    const handleInputFieldChange = (evt) => {
        errorHandler(evt.target.id, evt.target.value, errors, setErrors);

        const stateToChange = { ...newSale }

        // remove any $ signs or commas from deposit field
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
            if (validateForm(errors)) {
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
                    modal.clearForm();
                    setSelectedDealership("");
                    setSelectedVehicle("")
                });
            } else {
                window.alert('Please fix form entries');
            }
        };
    }

    return (
        <>
            <AddForm 
                handleInputFieldChange={handleInputFieldChange}
                errors={errors}
                newSale={newSale}
                setNewSale={setNewSale}
                selectedState={selectedState}
                selectedDealership={selectedDealership}
                setSelectedDealership={setSelectedDealership}
                postedSale={postedSale}
                setPostedSale={setPostedSale}
                selectedVehicle={selectedVehicle}
                setSelectedVehicle={setSelectedVehicle}
                setCreationView={props.setCreationView}
                handleSubmit={handleSubmit}
            />
        </>
    );
};
export default AddSaleForm;
