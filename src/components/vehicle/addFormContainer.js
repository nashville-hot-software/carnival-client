// REVIEW: - This component right now handles creating a new vehicle using pre-set
//         data from vehicle type and vehicle objects from DB. 
//         - We can also add new vehicle types here if the type we're looking for
//         doesn't exist.
//         - Most of the legwork here is being done by the handleInputFieldChange
//         function, which handles input values, state updates, and pre-populating /
//         clearing form fields.

import React, { useEffect, useState, useRef } from "react";
import VehicleManager from "../../api/dataManager"
import "../../styles/vehicles/list.css"
import "../../styles/vehicles/addForm.css"
import { errorHandler, validateForm} from "../validation/formValidator"
import { modal } from "../../modules/modal/helpers"
import AddForm from "./addForm"

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
      });
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        street: '',
        city: '',
        zipcode: '',
        msrPrice: '',
        floorPrice: '',
        deposit: '',
        yearOfCar: '',
        milesCount: ''
        });

      const [vehiclePosted, setVehiclePosted] = useState(false);

    //   const textInput = useRef();

    const handleInputFieldChange = (evt) => {
        const stateToChange = { ...newVehicle };

        // parsing certain fields to ints, removing commas and $ signs from price fields
        if (
            evt.target.id === 'floor_price' || 
            evt.target.id === 'msr_price' ||
            evt.target.id === 'miles_count' ||
            evt.target.id === 'year_of_car'
           ) {
            let value = evt.target.value;
    
            if (value.includes('$') && value.includes(',')) {
                const splitPrice = value.split('$');
                value = splitPrice[1];
                const secondSplitPrice = value.split(',');
                value = secondSplitPrice.join('');
            } else if (value.includes(',')) {
                const splitPrice = value.split(',');
                value = splitPrice.join('');
            } 

            stateToChange[evt.target.id] = parseInt(value);
            setNewVehicle(stateToChange);

            errorHandler(evt.target.id, evt.target.value, errors, setErrors);
        } 
        // clear fields, then get/set filtered vehicle makes based on body type selected
        else if (evt.target.id === 'body_type') {
            document.querySelector('#make').value="none";
            document.querySelector('#engine_type').value="none";
            
            // so when you re-select first dropdown, the other dependent dropdowns reset as well
            setFilteredMakes();
            setFilteredModels();
            setFilteredVehicle();

            const filtered_makes = vehicleTypes.filter(vehicleType => vehicleType.body_type === evt.target.value);
            setFilteredMakes(filtered_makes);

        } 
        // clear fields, then get/set filtered vehicle models based on make selected
        else if (evt.target.id === 'make' && filteredMakes !== undefined) {
            setFilteredVehicle();

            document.querySelector('#model').value="none";
            document.querySelector('#engine_type').value="none";

            const filtered_models = filteredMakes.filter(vehicleType => vehicleType.make === evt.target.value);
            setFilteredModels(filtered_models);

        } 
        // pre-set form fields based on model selected via fetching one from DB,
        // update newVehicle object with pre-set vehicle data
        else if (evt.target.id === 'model' && evt.target.value !== "none") {
            const filteredVehicleType = vehicleTypes.filter(vehicleType => vehicleType.model === evt.target.value);
            stateToChange.vehicle_type_id = filteredVehicleType[0].id;
            setNewVehicle(stateToChange);

            // get a vehicle matching the filtered vehicle to update form fields
            VehicleManager.getAll("vehicles", "vehicle_type", filteredVehicleType[0].id)
                .then(resp => {
                    if (resp[0] !== undefined) {
                        setFilteredVehicle(resp[0]);
                        document.querySelector('#engine_type').value="filtered-engine-type";
    
                        stateToChange.engine_type = resp[0].engine_type;
                        stateToChange.msr_price = resp[0].msr_price;
                        stateToChange.floor_price = resp[0].floor_price;
    
                        setNewVehicle(stateToChange);
                    }
                });
        } else {
            // add rest of data to newVehicle object to be POSTed
            stateToChange[evt.target.id] = evt.target.value;
            setNewVehicle(stateToChange);
        }  
    };

    // Switches VT selects to input fields to add new VT
    const handleAddNewVehicleType = () => {
        setFilteredVehicle();
        setAddVehicleTypeMode(!addVehicleTypeMode);

        modal.clearForm();
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
            if (validateForm(errors)) {
                VehicleManager.PostData("vehicles", newVehicle)
                    .then(() => {
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
                        setVehiclePosted(true);
                        modal.clearForm();
                    });
            } else {
                window.alert('Please fix form entries');
            }
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
        <AddForm 
            addVehicleTypeMode={addVehicleTypeMode}
            handleInputFieldChange={handleInputFieldChange}
            uniqueBodyTypes={uniqueBodyTypes}
            uniqueMakes={uniqueMakes}
            filteredModels={filteredModels}
            setAddVehicleTypeMode={setAddVehicleTypeMode}
            uniqueBodyTypes={uniqueBodyTypes}
            handleAddNewVehicleType={handleAddNewVehicleType}
            filteredVehicle={filteredVehicle}
            errors={errors}
            handleVehicleSubmit={handleVehicleSubmit}
            vehiclePosted={vehiclePosted}
            setVehiclePosted={setVehiclePosted}
            setCreationView={props.setCreationView}
        />
    );
};

export default AddVehicleModal;
