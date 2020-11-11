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

	const handleFieldChange = evt => {
	VehicleManager.getAll("vehicletypes","searchTerm",evt.target.value)
			.then(matchedVehicles => {
					setVehicleTypes(matchedVehicles);
			});
	}
	
	const handleInputFieldChange = evt => {
		const stateToChange = {...newVehicleType}
		stateToChange[evt.target.id] = evt.target.value
		setNewVehicleType(stateToChange)
	}

	const handleSubmit = () => {
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
								<Modal.Title>Add Vehicle</Modal.Title>
							</Modal.Header>
							<div className='modalBody'>
								<Modal.Body className="fieldset">
											<label className="name--label">Body Type:</label>
											<input onChange={handleInputFieldChange} id="body_type" className="modal--input" type="text"/>
									</Modal.Body>
									<Modal.Body className="fieldset">
											<label className="name--label">Make:</label>
											<input onChange={handleInputFieldChange} id="make" className="modal--input" type="text"/>
									</Modal.Body>
									<Modal.Body className="fieldset">
											<label className="name--label">Model:</label>
											<input onChange={handleInputFieldChange} id="model" className="modal--input" type="text"/>
									</Modal.Body>

									<Modal.Body>
											<button onClick={handleSubmit} className="addVehicleType--btn">
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
