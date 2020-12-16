import React, { useState } from "react";
import DealershipManager from "../../api/dataManager";
import "../../styles/dealerships/list.css"
import { errorHandler, validateForm} from "../validation/formValidator"
import { modal } from "../../modules/modal/helpers"
import AddForm from "./addForm"

const AddDealershipModal = (props) => {
    const [newDealership, setNewDealership] = useState({
        business_name: "",
        city: "",
        state: "",
        phone: "",
        website: ""
      })
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        zipcode: '',
        price: '',
        deposit: '',
        website: ''
    });
    const [dealershipPosted, setDealershipPosted] = useState(false);

    const handleInputFieldChange = (evt) => {
        const stateToChange = { ...newDealership };
        stateToChange[evt.target.id] = evt.target.value;
        setNewDealership(stateToChange);

        errorHandler(evt.target.id, evt.target.value, errors, setErrors);
    };

    const handleSubmit = () => {
        if (newDealership.first_name === "" || newDealership.last_name === "") {
            window.alert("Please fill out employee name fields");
        } else if (newDealership.email_address === "") {
            window.alert("Please enter an email address");
        } else if (newDealership.phone === "") {
            window.alert("Please enter a phone number");
        } else if (newDealership.dealership_id === 0) {
            window.alert("Please select a valid dealership");
        } else if (newDealership.employee_type_id === 0) {
            window.alert("Please select a valid employee type");
        } else {
            if (validateForm(errors)) {
                // Make the POST, then clear all data from form
                DealershipManager.PostData("dealerships", newDealership).then(() => {
                    setNewDealership({
                        business_name: "",
                        city: "",
                        state: "",
                        phone: "",
                        website: "",
                        tax_id: ""
                    });
                    
                    setDealershipPosted(true);
                    modal.clearForm();
                });
            } else {
                window.alert('Please fix form fields')
            }
        }
    };

    return (
        <AddForm 
            handleInputFieldChange={handleInputFieldChange}
            newDealership={newDealership}
            errors={errors}
            handleSubmit={handleSubmit}
            dealershipPosted={dealershipPosted}
            setDealershipPosted={setDealershipPosted}
            setCreationView={props.setCreationView}
        />
    );
};

export default AddDealershipModal;
