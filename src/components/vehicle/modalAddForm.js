import React, { useEffect, useState } from "react";
import VehicleManager from "../../api/dataManager"
import "./list.css";
import "./modalAddForm.css";

const AddVehicleModal = (props) => {

    // Will need a dropdown with current vehicle types, and if the
    // vehicle employee is trying to add does not exist, will give
    // them option to add new vehicle type

    // (First, select menu for body types --> filter makes for next
    // select menu --> select make --> filter models for next select)
    const [vehicleTypes, setVehicleTypes] = useState()
    const [filteredMakes, setFilteredMakes] = useState()
    const [filteredModels, setFilteredModels] = useState()
    
    const [addVehicleTypeMode, setAddVehicleTypeMode] = useState(false)
    
    // Get unique body types for first dropdown
    let uniqueBodyTypes;
    if (vehicleTypes !== undefined) {
        uniqueBodyTypes = [...new Set(vehicleTypes.map(item => item.body_type))]
    }

    const [newVehicle, setNewVehicle] = useState({
        engine_type: "",
        exterior_color: "",
        floor_price: 0,
        interior_color: "",
        is_sold: false,
        miles_count: 0,
        msr_price: 0,
        vehicle_type_id: 0,
        year_of_car: 0
      })
    
      const [newVehicleType, setNewVehicleType] = useState({
        body_type: "",
        make: "",
        model: ""
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
            setNewVehicle(stateToChange);
        } else if (evt.target.id === 'body_type') {
            const filtered_makes = vehicleTypes.filter(vehicleType => vehicleType.body_type === evt.target.value);
            setFilteredMakes(filtered_makes);
        } else if (evt.target.id === 'make' && filteredMakes !== undefined) {
            const filtered_models = filteredMakes.filter(vehicleType => vehicleType.make === evt.target.value);
            setFilteredModels(filtered_models);
        } else if (evt.target.id === 'model') {
            const filteredVehicleType = vehicleTypes.filter(vehicleType => vehicleType.model === evt.target.value);
            stateToChange.vehicle_type_id = filteredVehicleType[0].id;
            setNewVehicle(stateToChange);
        } else {
            stateToChange[evt.target.id] = evt.target.value;
            setNewVehicle(stateToChange);
        }  
    };

    const handleAddNewVehicleType = () => {
        setAddVehicleTypeMode(!addVehicleTypeMode);

        const inputs = document.querySelectorAll('input');
        const selects = document.querySelectorAll('select');

        inputs.forEach(input => input.value = "");
        selects.forEach(select => select.value = "none");
    }
    
    const handleVehicleTypeFieldChange = evt => {
        const stateToChange = {...newVehicleType}
        stateToChange[evt.target.id] = evt.target.value;
        console.log(stateToChange);
        setNewVehicleType(stateToChange);
    }
    
    const handleVehicleTypeSubmit = () => {
        if (
            newVehicleType.body_type === "" || newVehicleType.make === "" || 
            newVehicleType.model === "" 
           ) {
            window.alert("Please fill out all fields");
        } else {
            VehicleManager.PostData("vehicletypes", newVehicleType)
                .then(resp => {
                    console.log(`New vehicletype from DB! --> ${resp}`);
                    setAddVehicleTypeMode(false);
                    document.querySelector('input[type=checkbox').checked = false;

                    const inputs = document.querySelectorAll('input');
                    const selects = document.querySelectorAll('select');

                    inputs.forEach(input => input.value = "");
                    selects.forEach(select => select.value = "none");
                });
        }
    }

    const handleSubmit = () => {
        if (
            newVehicle.engine_type === "" || newVehicle.exterior_color === "" || 
            newVehicle.floor_price === "" || newVehicle.interior_color === "" || 
            newVehicle.miles_count === 0 || newVehicle.msr_price === 0 || 
            newVehicle.year_of_car === 0
           ) {
            window.alert("Please fill out all fields");
        } else {
            // Make the POST, then clear all data from form
            console.log(`New vehicle before DB POST --> ${newVehicle}`)

            VehicleManager.PostData("vehicles", newVehicle).then(resp => {
                console.log(`New vehicle from DB! --> ${resp}`)
                
                setNewVehicle({
                    engine_type: "",
                    exterior_color: "",
                    floor_price: 0,
                    interior_color: "",
                    is_sold: false,
                    miles_count: 0,
                    msr_price: 0,
                    vehicle_type_id: 0,
                    year_of_car: 0
                });
                
                const inputs = document.querySelectorAll('input')
                const selects = document.querySelectorAll('select')

                inputs.forEach(input => input.value = "")
                selects.forEach(select => select.value = "none")
            });
        }
    };

    useEffect(() => {
        VehicleManager.getAll("vehicletypes")
            .then(resp => {
                console.log(resp);
                setVehicleTypes(resp);
            })
    }, [addVehicleTypeMode])

    return (
        <>
            <div className="modalHeader addEmployee">
                Add New Vehicle
            </div>
                
            <div className="modal-add--body">
                

                
                {addVehicleTypeMode === false ? (
                    <>
                    <label className="name--label">Body Type:</label>
                    <select 
                        onChange={handleInputFieldChange} 
                        id="body_type" 
                        className="modal--input" 
                    >
                        <option>Select One</option>
                        {uniqueBodyTypes !== undefined ? (
                            uniqueBodyTypes.map(body_type => {
                            return <option>{body_type}</option>
                        })
                        ) : null}
                    </select>
                    <label className="name--label">Make:</label>
                    <select
                        id="make"
                        onChange={handleInputFieldChange}
                        className="modal--input"
                    >
                        <option>Select One</option>
                        {filteredMakes !== undefined ? (
                            filteredMakes.map(vehicle => {
                            return <option>{vehicle.make}</option>
                        })
                        ) : null}
                    </select>
                    <label className="name--label">Model:</label>
                    <select
                        id="model"
                        onChange={handleInputFieldChange}
                        className="modal--input"
                    >
                        <option>Select One</option>
                        {filteredModels !== undefined ? (
                            filteredModels.map(vehicle => {
                            return <option>{vehicle.model}</option>
                        })
                        ) : null}
                    </select>
                    </>
                ) : (
                    <>   
                    <label className="name--label">Body Type:</label>
                    <select 
                        onChange={handleVehicleTypeFieldChange} 
                        id="body_type" 
                        className="modal--input" 
                    >
                        <option>Select One</option>
                        {uniqueBodyTypes !== undefined ? (
                            uniqueBodyTypes.map(body_type => {
                            return <option>{body_type}</option>
                        })
                        ) : null}
                    </select> 
                    <label className="name--label">Make:</label>
                    <input onChange={handleVehicleTypeFieldChange} id="make" className="modal--input" type="text"/>
    
                    <label className="name--label">Model:</label>
                    <input onChange={handleVehicleTypeFieldChange} id="model" className="modal--input" type="text"/>

                    <button onClick={handleVehicleTypeSubmit}>Submit</button>
                    </>
                )}

                <div>
                    <label>Don't see the vehicle you're adding?</label>
                    <input onChange={handleAddNewVehicleType} type="checkbox" />
                </div>

                <label className="name--label">Engine Type:</label>
                <input onChange={handleInputFieldChange} id="engine_type" className="modal--input" type="text"/>

                <label className="name--label">Year:</label>
                <input onChange={handleInputFieldChange} id="year_of_car" className="modal--input" type="text"/>

                <label className="name--label">Miles:</label>
                <input onChange={handleInputFieldChange} id="miles_count" className="modal--input" type="text"/>
                
                {/* <label className="name--label">VIN #:</label>
                <input onChange={handleInputFieldChange} id="vin" className="modal--input" type="text"/> */}
                
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
