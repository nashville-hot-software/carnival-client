import React, { useState, useEffect } from "react";
import VehicleTypeCard from "./card";
import VehicleManager from "../../api/dataManager";
import "./list.css"
import {Modal} from "react-bootstrap";
// import Modal from "react-bootstrap/esm/Modal";

const VehicleType = props => {

	const [vehicleTypes, setVehicleTypes] = useState([]);
	const [newVehicleType, setNewVehicleType] = useState({
		body_type: "",
		make: "",
		model: ""
	})

	
	const [show, setShow] = useState(false);
	
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [showVehicle, setShowVehicle] = useState(false);
	
	const handleCloseVehicle	 = () => setShowVehicle(false);
	const handleShowVehicle = () => setShowVehicle(true);
	
	const handleFieldChange = evt => {
		VehicleManager.getAll("vehicletypes","searchTerm",evt.target.value)
		.then(matchedVehicles => {
			setVehicleTypes(matchedVehicles);
		});
	}
	
	const handleInputVehicleTypeFieldChange = evt => {
		const stateToChange = {...newVehicleType}
		stateToChange[evt.target.id] = evt.target.value
		setNewVehicleType(stateToChange)
	}
	
	const handleSubmitVehicleType = () => {
		if (newVehicleType.body_type === "" || newVehicleType.last_name === "") {
			window.alert("Please fill out body type field")
		} else if (newVehicleType.make === "") {
			window.alert("Please enter a make")
		} else if (newVehicleType.model === "") {
			window.alert("Please enter a model")
		} else {
			VehicleManager.PostData("vehicletypes", newVehicleType)
			.then(() => setShow(false))
		}
	} 
	
	const [vehicles, setVehicles] = useState([]);
	const [newVehicle, setNewVehicle] = useState({
		vin: '',
		engine_type: '',
		exterior_color: '',
		interior_color: '',
		floor_price: 0,
		msr_price: 0,
		miles_count: 0,
		year_of_car: 0,
		is_sold: false,
		vehicle_type_id: 0
	});
	
	const handleSubmitVehicle = () => {
		if (newVehicle.vin === "") {
			window.alert("Please fill out a VIN")
		} else if (newVehicle.engine_type === "") {
			window.alert("Please enter an engine type")
		} else if (newVehicle.exterior_color === "") {
			window.alert("Please enter an exterior color")
		} else if (newVehicle.interior_color === "") {
			window.alert("Please enter an exterior color")
		} else if (newVehicle.floor_price === 0) {
			window.alert("Please enter an exterior color")
		} else if (newVehicle.msr_price === 0) {
			window.alert("Please enter an exterior color")
		} else if (newVehicle.miles_count === 0) {
			window.alert("Please enter miles")
		} else if (newVehicle.year_of_car === 0) {
			window.alert("Please enter a year")
		} else if (newVehicle.vehicle_type_id === 0) {
			window.alert("Please enter type of vehicle")
		} else {
			VehicleManager.PostData("vehicles", newVehicle)
			.then(() => setShowVehicle(false))
		}
	} 
	
	const handleInputVehicleFieldChange = evt => {
		const stateToChange = {...newVehicle}
		stateToChange[evt.target.id] = evt.target.value
		setNewVehicle(stateToChange)
	}
	
	const fetchVehicleTypes = () => {
    VehicleManager.getAll("vehicletypes")
      .then(vehicleTypes => {
        setVehicleTypes(vehicleTypes);
    });
  }

	useEffect(() => {
    fetchVehicleTypes();
  }, [])

	return (
		<>
			<div className="vehicles--container">
				<div className="vehicles--subContainer">
					<div className="vehicles--header">
						Vehicles
					</div>

					<input 
						className="vehicles-searchBar" 
						placeholder="Search by model type" 
						type='text' 
						onChange={handleFieldChange}
					/>
					
					{vehicleTypes !== undefined ? (
							<div className="searchResults">
						{vehicleTypes.map(vehicletype => {
								return (
										<VehicleTypeCard
										key={vehicletype.id}
										vehicletype={vehicletype}
										{...props}
										/>
										);
								})}
						</div>
					) : null}

					<button 
						onClick={() => handleShow()} 
						className="addVehicleType--btn">
						Add Vehicle Type
					</button>


					<Modal 
						className='modal--form' 
						show={show} 
						onHide={handleClose} >
							<Modal.Header className='modalHeader' closeButton>
								<Modal.Title>Add Vehicle Type</Modal.Title>
							</Modal.Header>
							<div className='modalBody'>
								<Modal.Body className="fieldset">
										<label className="name--label">Body Type:</label>
										<input onChange={handleInputVehicleTypeFieldChange} id="body_type" className="modal--input" type="text"/>
										
										<label className="name--label">Make:</label>
										<input onChange={handleInputVehicleTypeFieldChange} id="make" className="modal--input" type="text"/>

										<label className="name--label">Model:</label>
										<input onChange={handleInputVehicleTypeFieldChange} id="model" className="modal--input" type="text"/>
								</Modal.Body>

								<Modal.Body>
										<button onClick={handleSubmitVehicleType} className="addVehicleType--btn">
												Submit
										</button>
								</Modal.Body>
							</div>
					</Modal>

					<button 
						onClick={() => handleShowVehicle()} 
						className="addVehicle--btn">
						Add New Vehicle
					</button>

					<Modal 
						className='modal--form' 
						show={showVehicle} 
						onHide={handleCloseVehicle} >
							<Modal.Header className='modalHeader' closeButton>
								<Modal.Title>Add Vehicle</Modal.Title>
							</Modal.Header>
							<div className='modalBody'>
								<Modal.Body className="fieldset">
											<label className="name--label">VIN:</label>
											<input onChange={handleInputVehicleFieldChange} id="vin" className="modal--input" type="text"/>

											<label className="name--label">Engine Type:</label>
											<input onChange={handleInputVehicleFieldChange} id="engine_type" className="modal--input" type="text"/>

											<label className="name--label">Exterior Color:</label>
											<input onChange={handleInputVehicleFieldChange} id="exterior_color" className="modal--input" type="text"/>

											<label className="name--label">Interior Color:</label>
											<input onChange={handleInputVehicleFieldChange} id="interior_color" className="modal--input" type="text"/>

											<label className="name--label">Floor Price:</label>
											<input onChange={handleInputVehicleFieldChange} id="floor_price" className="modal--input" type="text"/>

											<label className="name--label">MSRP:</label>
											<input onChange={handleInputVehicleFieldChange} id="msr_price" className="modal--input" type="text"/>

											<label className="name--label">Miles Count:</label>
											<input onChange={handleInputVehicleFieldChange} id="miles_count" className="modal--input" type="text"/>

											<label className="name--label">Year:</label>
											<input onChange={handleInputVehicleFieldChange} id="year_of_car" className="modal--input" type="text"/>

											{/* <label className="name--label">Vehicle Type:</label> */}
											{/* <input onChange={handleInputVehicleFieldChange} id="vehicle_type_id" className="modal--input" type="text"/> */}
											{vehicleTypes !== undefined ? (
                            <>
                                <label className="vehicle_Type--label">Vehicle Type:</label>
                                <select 
                                    id="vehicle_type_id" 
                                    onChange={handleInputVehicleTypeFieldChange}
                                    className="vehicle_Type--select"
                                >
                                    {vehicleTypes.map(type => {
                                        return (
                                            <option value={type.id}>
                                                {type.make} {type.model}
                                            </option>
                                        )
                                    })}
                                </select>
                            </>
                        ) : null}

									</Modal.Body>

									<Modal.Body>
											<button onClick={handleSubmitVehicle} className="addVehicleType--btn">
													Submit
											</button>
									</Modal.Body>
							</div>
					</Modal>
				</div>
			</div>
		</>
	);
};

export default VehicleType;
