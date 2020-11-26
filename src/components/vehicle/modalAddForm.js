import React, { useState } from "react";
import VehicleManager from "../../api/dataManager";
import "./list.css";
import "./modalAddForm.css";

const AddVehicleModal = (props) => {

    const [newVehicle, setNewVehicle] = useState({
        body_type: "",
        engine_type: "",
        exterior_color: "",
        floor_price: 0,
        interior_color: "",
        is_sold: false,
        make: "",
        miles_count: 0,
        model: "",
        msr_price: 0,
        // vehicle_type_id: 10,
        vin: "",
        year_of_car: 0
      })

    const handleClose = () => {
        props.setCreationView(false)

        const inputs = document.querySelectorAll('input')
        const selects = document.querySelectorAll('select')

        inputs.forEach(input => input.value = "")
        selects.forEach(select => select.value = "none")

        document.querySelector(".modal-bg").classList.add("fade-out");
        document.querySelector(".modal-box").classList.add("fade-out");

        setTimeout(function () {
            document.querySelector(".modal-box").classList.remove("fade-out");
            document.querySelector(".modal-bg").classList.remove("fade-out");
            document.querySelector(".modal-box").classList.remove("show");
            document.querySelector(".modal-bg").classList.remove("show");
        }, 500);
    };

    const handleInputFieldChange = (evt) => {
        const stateToChange = { ...newVehicle };

        if (
            evt.target.id === 'floor_price' || 
            evt.target.id === 'msr_price' ||
            evt.target.id === 'miles_count' ||
            evt.target.id === 'year_of_car'
           ) {
            let value = evt.target.value;

            if (value.includes(',')) {
                const split_price = value.split(',');
                value = split_price.join('');
            }

            stateToChange[evt.target.id] = parseInt(value);
            console.log(stateToChange)
            setNewVehicle(stateToChange);
        } else {
            stateToChange[evt.target.id] = evt.target.value;
            setNewVehicle(stateToChange);
            console.log(stateToChange)
        }  
    };

    const handleSubmit = () => {
        // if (newVehicle.first_name === "" || newVehicle.last_name === "") {
        //     window.alert("Please fill out employee name fields");
        // } else if (newVehicle.email_address === "") {
        //     window.alert("Please enter an email address");
        // } else if (newVehicle.phone === "") {
        //     window.alert("Please enter a phone number");
        // } else if (newVehicle.dealership_id === 0) {
        //     window.alert("Please select a valid dealership");
        // } else if (newVehicle.employee_type_id === 0) {
        //     window.alert("Please select a valid employee type");
        // } else {
            // Make the POST, then clear all data from form

            console.log(newVehicle);

            // VehicleManager.PostData("vehicles", newVehicle).then(() => {
                setNewVehicle({
                    body_type: "",
                    engine_type: "",
                    exterior_color: "",
                    floor_price: 0,
                    interior_color: "",
                    is_sold: false,
                    make: "",
                    miles_count: 0,
                    model: "",
                    msr_price: 0,
                    vin: "",
                    year_of_car: 0
                });
                
                const inputs = document.querySelectorAll('input')
            //     const selects = document.querySelectorAll('select')

                inputs.forEach(input => input.value = "")
            //     selects.forEach(select => select.value = "none")
            // });
        // }
    };

    return (
        <>
            <div className="modalHeader addEmployee">
                Add New Vehicle
            </div>
                
            <div className="modal-add--body">
                <label className="name--label">Body Type:</label>
                <input onChange={handleInputFieldChange} id="body_type" className="modal--input" type="text"/>

                <label className="name--label">Make:</label>
                <input onChange={handleInputFieldChange} id="make" className="modal--input" type="text"/>

                <label className="name--label">Model:</label>
                <input onChange={handleInputFieldChange} id="model" className="modal--input" type="text"/>

                <label className="name--label">Engine Type:</label>
                <input onChange={handleInputFieldChange} id="engine_type" className="modal--input" type="text"/>

                <label className="name--label">Year:</label>
                <input onChange={handleInputFieldChange} id="year_of_car" className="modal--input" type="text"/>

                <label className="name--label">Miles:</label>
                <input onChange={handleInputFieldChange} id="miles_count" className="modal--input" type="text"/>
                
                <label className="name--label">VIN #:</label>
                <input onChange={handleInputFieldChange} id="vin" className="modal--input" type="text"/>
                
                <label className="name--label">MSR Price:</label>
                <input onChange={handleInputFieldChange} id="msr_price" className="modal--input" type="text"/>
                
                <label className="name--label">Floor Price:</label>
                <input onChange={handleInputFieldChange} id="floor_price" className="modal--input" type="text"/>
                
                <label className="name--label">Exterior Color:</label>
                <input onChange={handleInputFieldChange} id="exterior_color" className="modal--input" type="text"/>
                
                <label className="name--label">Interior Color:</label>
                <input onChange={handleInputFieldChange} id="interior_color" className="modal--input" type="text"/>
                
                <label className="name--label">Is Sold?</label>
                <input onChange={handleInputFieldChange} id="is_sold" className="modal--input" type="checkbox"/>

                <div className="addEmployee--btn--container">
                    <button onClick={handleSubmit} className="modal--addBtn">
                        Submit 
                    </button>
                    <button className="closeBtn" onClick={handleClose}>
                        Close  
                    </button>
                </div>
            </div>
        </>
    );
};

export default AddVehicleModal;
