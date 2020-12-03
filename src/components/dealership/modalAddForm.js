import React, { useState } from "react";
import DealershipManager from "../../api/dataManager";
import "./list.css";
import SuccessSnackbar from "../modal/snackbar"

const AddDealershipModal = (props) => {

    const [newDealership, setNewDealership] = useState({
        business_name: "",
        city: "",
        state: "",
        phone: "",
        website: ""
      })
    
    const [dealershipPosted, setDealershipPosted] = useState(false);

    const handleClose = () => {
        const inputs = document.querySelectorAll('input')
        const selects = document.querySelectorAll('select')

        inputs.forEach(input => input.value = "")
        selects.forEach(select => select.value = "none")

        document.querySelector(".modal-box").classList.remove("show");
        
        setTimeout(() => {
            document.querySelector(".modal-bg").classList.remove("show");
        }, 300);

        setTimeout(function () {
            props.setCreationView(false)
        }, 700);
    };

    const handleInputFieldChange = (evt) => {
        const stateToChange = { ...newDealership };
        stateToChange[evt.target.id] = evt.target.value;
        setNewDealership(stateToChange);
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
                
                const inputs = document.querySelectorAll('input')
                const selects = document.querySelectorAll('select')

                inputs.forEach(input => input.value = "")
                selects.forEach(select => select.value = "none")
            });
        }
    };

    return (
        <>
            <div className="modalHeader addEmployee">
                Add Dealership
            </div>
                
            <div className="modal-add--body">
                <label className="name--label">Dealership Name:</label>
                <input onChange={handleInputFieldChange} id="business_name" className="modal--input" type="text"/>

                <label className="name--label">City:</label>
                <input onChange={handleInputFieldChange} id="city" className="modal--input" type="text"/>

                <label className="name--label">State:</label>
                <input onChange={handleInputFieldChange} id="state" className="modal--input" type="text"/>

                <label className="name--label">Phone:</label>
                <input onChange={handleInputFieldChange} id="phone" className="modal--input" type="text"/>

                <label className="name--label">Website:</label>
                <input onChange={handleInputFieldChange} id="website" className="modal--input" type="text"/>

                <div className="addEmployee--btn--container">
                    <button onClick={handleSubmit} className="modal--addBtn">
                        Submit 
                    </button>
                    <button 
                        className={`closeBtn ${dealershipPosted === true ? "disabled" : ""}`} 
                        disabled={dealershipPosted === true ? true : false}
                        onClick={handleClose}
                    >
                        Close  
                    </button>
                </div>
                
                <SuccessSnackbar 
                    dealershipPosted={dealershipPosted} 
                    setDealershipPosted={setDealershipPosted}
                />
            </div>
        </>
    );
};

export default AddDealershipModal;
