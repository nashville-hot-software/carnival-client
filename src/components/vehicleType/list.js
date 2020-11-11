import React, { useState, useEffect } from "react";
import VehicleTypeCard from "./card";
import VehicleManager from "../../api/dataManager";
import "./list.css"
import { Modal} from "react-bootstrap";

const VehicleType = props => {

		const [vehicles, setVehicles] = useState([]);
		const [newVehicle, setNewVehicle] = useState({
			body_type: "",
			make: "",
			model: ""
		});

const [show, setShow] = useState(false);

		const handleClose = () => setShow(false);
		const handleShow = () => setShow(true);
	

    const handleFieldChange = evt => {
    VehicleManager.getAll("vehicletypes","searchTerm",evt.target.value)
        .then(matchedVehicles => {
            setVehicles(matchedVehicles);
        });
		}
		
		const handleInputFieldChange = evt => {
			const stateToChange = {...newVehicle}
			stateToChange[evt.target.id] = evt.target.value
			setNewVehicle(stateToChange)
		}

		const handleSubmit = () => {
			if (newVehicle.body_type === "" || newVehicle.last_name === "") {
					window.alert("Please fill out body type field")
			} else if (newVehicle.make === "") {
					window.alert("Please enter a make")
			} else if (newVehicle.model === "") {
					window.alert("Please enter a model")
			} else {
					VehicleManager.PostData("vehicletypes", newVehicle)
							.then(() => setShow(false))
			}
		} 
  
    return (
      <>
        <div className="vehicletypes--container">
          <div className="vehicletypes--subContainer">
            <div className="vehicletypes--header">
              Vehicles
            </div>

						<input 
							className="vehicletypes-searchBar" 
							placeholder="Search by model type" 
							type='text' 
							onChange={handleFieldChange}
						/>
						
						{vehicles !== undefined ? (
								<div className="searchResults">
							{vehicles.map(vehicletype => {
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
              Add New Vehicle
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
  