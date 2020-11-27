// REVIEW: - This component right now handles creating a new vehicle using pre-set
//         data from vehicle type and vehicle objects from DB. 
//         - We can also add new vehicle types here if the type we're looking for
//         doesn't exist.
//         - Most of the legwork here is being done by the handleInputFieldChange
//         function, which handles input values, state updates, and pre-populating /
//         clearing form fields.

import React, { useEffect, useState } from "react";
import VehicleManager from "../../api/dataManager"
import "./list.css";
import "./modalAddForm.css";

const AddVehicleModal = (props) => {

    // Filters down to specific model for select menus
    const [vehicleTypes, setVehicleTypes] = useState()
    const [filteredMakes, setFilteredMakes] = useState()
    const [filteredModels, setFilteredModels] = useState()
    
    // pre-populates form data based on vehicle type selected
    const [filteredVehicle, setFilteredVehicle] = useState()
    
    // triggers ternary to add new vehicle type instead of selecting existing
    const [addVehicleTypeMode, setAddVehicleTypeMode] = useState(false)
    
    // Get unique body types and makes for select menus
    let uniqueBodyTypes;
    if (vehicleTypes !== undefined) {
        uniqueBodyTypes = [...new Set(vehicleTypes.map(item => item.body_type))]
    }
    let uniqueMakes;
    if (filteredMakes !== undefined) {
        uniqueMakes = [...new Set(filteredMakes.map(item => item.make))]
    }

    // for new vehicle POST
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
    
      // for new vehicletype POST   
      const [newVehicleType, setNewVehicleType] = useState({
        body_type: "",
        make: "",
        model: ""
      })

    const handleModalClose = () => {
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

        // parsing certain fields to ints, removing commas from price fields
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

        } 
        // clear fields, then get/set filtered vehicle makes based on body type selected
        else if (evt.target.id === 'body_type') {
            document.querySelector('#make').value="none";
            document.querySelector('#engine_type').value="none";
            
            setFilteredMakes();
            setFilteredModels();
            setFilteredVehicle();

            const filtered_makes = vehicleTypes.filter(vehicleType => vehicleType.body_type === evt.target.value);
            setFilteredMakes(filtered_makes);

        } 
        // clear fields, then get/set filtered vehicle models based on make selected
        else if (evt.target.id === 'make' && filteredMakes !== undefined) {
            document.querySelector('#model').value="none";
            document.querySelector('#engine_type').value="none";
            setFilteredVehicle();

            const filtered_models = filteredMakes.filter(vehicleType => vehicleType.make === evt.target.value);
            setFilteredModels(filtered_models);

        } 
        // pre-set form fields based on model selected via fetching one from DB,
        // update newVehicle object with pre-set vehicle data
        else if (evt.target.id === 'model' && evt.target.value !== "none") {
            document.querySelector('#engine_type').value="filtered-engine-type";

            const filteredVehicleType = vehicleTypes.filter(vehicleType => vehicleType.model === evt.target.value);
            stateToChange.vehicle_type_id = filteredVehicleType[0].id;
            setNewVehicle(stateToChange);

            VehicleManager.getAll("vehicles", "vehicle_type", filteredVehicleType[0].id)
                .then(resp => {

                    if (resp[0] !== undefined) {
                        setFilteredVehicle(resp[0]);
    
                        stateToChange.engine_type = resp[0].engine_type;
                        stateToChange.msr_price = resp[0].msr_price;
                        stateToChange.floor_price = resp[0].floor_price;
    
                        setNewVehicle(stateToChange);
                    }

                })

        } else {
            // add rest of data to newVehicle object to be POSTed
            stateToChange[evt.target.id] = evt.target.value;
            setNewVehicle(stateToChange);

        }  
    };

    // Switches VT selects to input fields to add new VT
    const handleAddNewVehicleType = () => {
        setAddVehicleTypeMode(!addVehicleTypeMode);

        const inputs = document.querySelectorAll('input');
        const selects = document.querySelectorAll('select');

        inputs.forEach(input => input.value = "");
        selects.forEach(select => select.value = "none");
    }
    
    // builds new vehicleType object to be POSTed to vehicletypes table
    const handleVehicleTypeFieldChange = evt => {
        const stateToChange = {...newVehicleType}
        stateToChange[evt.target.id] = evt.target.value;
        setNewVehicleType(stateToChange);
    }
    
    // If form data is good, POST new vehicleType then clear form fields
    const handleVehicleTypeSubmit = () => {
        if (
            newVehicleType.body_type === "" || newVehicleType.make === "" || 
            newVehicleType.model === "" 
           ) {
            window.alert("Please fill out all fields");
        } else {
            VehicleManager.PostData("vehicletypes", newVehicleType)
                .then(() => {
                    setAddVehicleTypeMode(false);
                    document.querySelector('input[type=checkbox').checked = false;

                    const inputs = document.querySelectorAll('input');
                    const selects = document.querySelectorAll('select');

                    inputs.forEach(input => input.value = "");
                    selects.forEach(select => select.value = "none");
                });
        }
    }

    // If form data is good, POST new vehicle,
    // then clear newEmployee object and all form fields
    const handleVehicleSubmit = () => {
        console.log(newVehicle);
        if (
            newVehicle.engine_type === "" || newVehicle.exterior_color === "" || 
            newVehicle.floor_price === "" || newVehicle.interior_color === "" || 
            newVehicle.miles_count === 0 || newVehicle.msr_price === 0 || 
            newVehicle.year_of_car === 0
           ) {
            window.alert("Please fill out all fields");
        } else {
            VehicleManager.PostData("vehicles", newVehicle).then(resp => {
                console.log(`New vehicle from DB! VV`);
                console.log(resp);
                
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
                setFilteredVehicle();
                
                const inputs = document.querySelectorAll('input')
                const selects = document.querySelectorAll('select')

                inputs.forEach(input => input.value = "")
                selects.forEach(select => select.value = "none")
            });
        }
    };

    // fetches data for vehicletype select menus to be filtered, 
    // re-renders when mode is switched to add new vehicleType
    useEffect(() => {
        VehicleManager.getAll("vehicletypes")
            .then(resp => {
                setVehicleTypes(resp);
            });
    }, [addVehicleTypeMode]);

    return (
        <>
            <div className="modalHeader addEmployee">
                Add New Vehicle
            </div>
                
            <div className="modal-add--body">
                
                {/* This ternary flips between vehicle type select form & vehicle type add form */}
                {addVehicleTypeMode === false ? (
                    <>
                    <label className="name--label">Body Type:</label>
                    <select 
                        onChange={handleInputFieldChange} 
                        id="body_type" 
                        className="modal--input" 
                    >
                        <option value="none">Select One</option>
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
                        <option value="none">Select One</option>
                        {uniqueMakes !== undefined ? (
                            uniqueMakes.map(make => {
                            return <option>{make}</option>
                        })
                        ) : null}
                    </select>
                    <label className="name--label">Model:</label>
                    <select
                        id="model"
                        onChange={handleInputFieldChange}
                        className="modal--input"
                    >
                        <option value="none">Select One</option>
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
                    <label>Don't see the right vehicle?</label>
                    <input onChange={handleAddNewVehicleType} type="checkbox" />
                </div>

                <label className="name--label">Engine Type:</label>
                <select 
                    id="engine_type"
                    className="modal--input"
                    onChange={handleInputFieldChange} 
                    defaultValue="none"
                >
                    <option value="filtered-engine-type">
                        {filteredVehicle !== undefined ? filteredVehicle.engine_type : null}
                    </option>
                    <option value="none">Select an Engine Type</option>
                    <option value="V4">V4</option>
                    <option value="V6">V6</option>
                    <option value="V8">V8</option>
                    <option value="EV">Electric Vehicle</option>
                </select>

                <label className="name--label">Year:</label>
                <input onChange={handleInputFieldChange} id="year_of_car" className="modal--input" type="text"/>

                <label className="name--label">Miles:</label>
                <input onChange={handleInputFieldChange} id="miles_count" className="modal--input" type="text"/>
                
                <label className="name--label">MSR Price:</label>
                <input 
                    onChange={handleInputFieldChange} 
                    id="msr_price" 
                    className="modal--input" 
                    type="text"
                    value={filteredVehicle !== undefined ? filteredVehicle.msr_price : null}
                />
                
                <label className="name--label">Floor Price:</label>
                <input 
                    onChange={handleInputFieldChange} 
                    id="floor_price" 
                    className="modal--input" 
                    type="text"
                    value={filteredVehicle !== undefined ? filteredVehicle.floor_price : null}
                />
                
                <label className="name--label">Exterior Color:</label>
                <input onChange={handleInputFieldChange} id="exterior_color" className="modal--input" type="text"/>
                
                <label className="name--label">Interior Color:</label>
                <input onChange={handleInputFieldChange} id="interior_color" className="modal--input" type="text"/>
                
                <label className="name--label">Is Sold?</label>
                <input onChange={handleInputFieldChange} id="is_sold" className="modal--input" type="checkbox"/>

                <div className="addEmployee--btn--container">
                    <button onClick={handleVehicleSubmit} className="modal--addBtn">
                        Submit 
                    </button>
                    <button className="closeBtn" onClick={handleModalClose}>
                        Close  
                    </button>
                </div>
            </div>
        </>
    );
};

export default AddVehicleModal;
