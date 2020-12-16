import React from "react"

const AddVehicleTypeForm = props => {
    return (
        <>
            <label className="name--label">Body Type:</label>
            <select 
                onChange={props.handleVehicleTypeFieldChange} 
                id="body_type" 
                className="modal--input" 
            >
                <option>Select One</option>
                {props.uniqueBodyTypes !== undefined ? (
                    props.uniqueBodyTypes.map(body_type => {
                    return <option>{body_type}</option>
                })
                ) : null}
            </select> 

            <label className="name--label">Make:</label>
            <input onChange={props.handleVehicleTypeFieldChange} id="make" className="modal--input" type="text"/>

            <label className="name--label">Model:</label>
            <input onChange={props.handleVehicleTypeFieldChange} id="model" className="modal--input" type="text"/>

            <button onClick={props.handleVehicleTypeSubmit}>Submit</button>
        </>
    );
}

export default AddVehicleTypeForm;