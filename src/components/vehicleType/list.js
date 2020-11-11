import React, { useState, useEffect } from "react";
import VehicleTypeCard from "./card";
import VehicleManager from "../../api/dataManager";
import "./list.css"
import { Modal, ModalTitle } from "react-bootstrap";
import ModalHeader from "react-bootstrap/esm/ModalHeader";

const VehicleType = props => {

    const [vehicles, setVehicles] = useState([]);

    const handleFieldChange = evt => {
    VehicleManager.getAll("vehicletypes","searchTerm",evt.target.value)
        .then(matchedVehicles => {
            setVehicles(matchedVehicles);
        });
    }
  
    return (
      <>
        <div className="vehicletypes--container">
          <div className="vehicletypes--subContainer">
            <div className="vehicletypes--header">
              Vehicles
            </div>

						<input 
							placeholder="Search by model type" 
							type='text' 
							onChange={handleFieldChange}
						/>
						
						{vehicles !== undefined ? (
								<div>
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
							className="addEmployee--btn">
              Add New Employee
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

                    {/* TODO: For the dealership, will need a submenu to search dealerships.... */}
                    <Modal.Body className="fieldset">
                        <label className="name--label">Dealership:</label>
                        <input className="modal--input" type="text" onChange={handleDealershipSearch} />
                        {dealerships !== undefined && dealerships.length > 0 ? (
                            <div className="dealership--dropdown">
                                {dealerships.map(dealership => {
                                    return (
                                    <>
                                        <div 
                                            className="dealership--select"
                                            id={dealership.id}
                                            onClick={handleDealerSelect}  
                                        >
                                            {dealership.business_name}
                                        </div>
                                    </>
                                    )
                                })}
                            </div>
                        ) : null}
                    </Modal.Body>
                    
                    {employeeTypes !== undefined ? (
                        <Modal.Body className="fieldset">
                            <label className="name--label">Employee Type:</label>
                            <select 
                                id="employee_type_id" 
                                onChange={handleInputFieldChange}
                            >
                                {employeeTypes.map(type => {
                                    return (
                                        <option value={type.id}>
                                            {type.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </Modal.Body>
                    ) : null}

                    <Modal.Body>
                        <button onClick={handleSubmit} className="addEmployee--btn">
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
  