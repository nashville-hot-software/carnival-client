import React, { useState } from "react";
import EmployeeManager from "../../api/dataManager";
import "./card.css"

import Modal from 'react-bootstrap/Modal';

import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const EmployeeDetailModal = props => {

  // employee obj to update (passed down from parent list component)
  const [employee, setEmployee] = useState({
    "first_name": props.employee.first_name,
    "last_name": props.employee.last_name,
    "email_address": props.employee.email_address,
    "phone": props.employee.phone,
    "dealership_id": props.employee.dealership_id,
    "employee_type_id": props.employee.employee_type_id
  });  

  const [employeeTypes, setEmployeeTypes] = useState([]);

  // State for expanding/hiding the dealership dropdown menu
  const [open, setOpen] = useState(false);
  const [selectedDealership, setSelectedDealership] = useState("");
  const [query, setQuery] = useState("");
  const [dealerships, setDealerships] = useState([]);

  const [editMode, setEditMode] = useState(false);

  const handleClose = () => {
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
    }, 1000);
  };

  const handleDealershipDropdownClose = () => setOpen(false)

  const handleEditMode = () => {
    fetchEmployeeTypes();
    setEditMode(!editMode)
  };

  // (For edit mode)
  const handleFieldChange = evt => {
    const stateToChange = {...employee};
    stateToChange[evt.target.id] = evt.target.value;
    setEmployee(stateToChange);
  };

  const handleDealershipSearch = evt => {
    setQuery(evt.target.value)

    if (evt.target.value.length > 0 && selectedDealership === "") {
      EmployeeManager.getAll("dealerships","searchTerm",evt.target.value)
        .then(matchedDealerships => {
          setDealerships(matchedDealerships);
      });

      setOpen(true);
    } else if ( selectedDealership !== "") {
      setSelectedDealership(evt.target.value);
    } else {
      setDealerships([]);

      setOpen(false);
    }
  }
  
  const handleDealerSelect = evt => {
    const stateToChange = {...employee}
    stateToChange.dealership_id = parseInt(evt.target.id)
    setEmployee(stateToChange)

    setSelectedDealership(evt.target.innerHTML)

    const dropdownDiv = document.querySelector('.dealership-list--dropdown')
    dropdownDiv.scrollTop = 0;
  }

  const fetchEmployeeTypes = () => {
    EmployeeManager.getAll("employeetypes")
      .then(employeeTypes => {
        setEmployeeTypes(employeeTypes);
    });
  }

  const handleEmployeeTypeSelect = evt => {
    const stateToChange = {...employee}
    stateToChange.employee_type_id = parseInt(evt.target.value)
    setEmployee(stateToChange)
  }

  const handleSubmit = () => {
    if (employee.first_name === "" || employee.last_name === "") {
        window.alert("Please fill out employee name fields")
    } else if (employee.email_address === "") {
        window.alert("Please enter an email address")
    } else if (employee.phone === "") {
        window.alert("Please enter a phone number")
    } else if (employee.dealership_id === 0) {
        window.alert("Please select a valid dealership")
    } else if (employee.employee_type_id === 0) {
        window.alert("Please select a valid employee type")
    } else {
        EmployeeManager.update("employees", employee, props.employee.id)
            .then(() => {
              setEditMode(false)
            })
    }
  } 

  return (
    <>
        <div className="modalHeader">
            Employee

            {/* <ul>
                <li class="ele">
                    <div
                        type="button"
                        onClick={handleClose}
                        className="x spin large "
                    >
                        <b></b>
                        <b></b>
                        <b></b>
                        <b></b>
                    </div>
                </li>
            </ul> */}
        </div>

        {editMode === false ? (
        <div className="modal-details--body">
            <strong>Name:</strong> {`${props.employee.first_name} ${props.employee.last_name}`}
            <strong>Email:</strong> {`${props.employee.email_address}`}
            <strong>Phone:</strong> {`${props.employee.phone}`}
            <strong>Dealership:</strong> {`${props.employee.business_name}`}
            <strong>Employee Type:</strong> {`${props.employee.employee_type}`}
        </div>
        ) : (
            <div className="modal-edit--body">
                <label><strong>First Name:</strong></label> 
                <input 
                type="text"
                id="first_name"
                placeholder={`${props.employee.first_name}`}
                onChange={handleFieldChange}
                className="inputField"
                />
            
            
                <label><strong>Last Name:</strong></label> 
                <input 
                type="text"
                id="last_name"
                placeholder={`${props.employee.last_name}`}
                onChange={handleFieldChange}
                className="inputField"
                />
            
            
                <label><strong>Email:</strong></label> 
                <input 
                type="text"
                id="email_address"
                placeholder={`${props.employee.email_address}`}
                onChange={handleFieldChange}
                className="inputField"
                />
            
            
                <label><strong>Phone:</strong></label> 
                <input 
                    type="text"
                    id="phone"
                    placeholder={`${props.employee.phone}`}
                    onChange={handleFieldChange}
                    className="inputField"
                />
            
                <label className="name--label dealership--label">Dealership:</label>
                <div onBlur={handleDealershipDropdownClose} className={`dealership-list--dropdown ${open ? 'open' : ''}`}>
                    <input 
                    type="text" 
                    className="dealership--search" 
                    onChange={handleDealershipSearch} 
                    placeholder={`${props.employee.business_name}`} 
                    value={`${selectedDealership !== "" ? selectedDealership : query}`}
                    />
                    
                    {dealerships !== undefined && dealerships.length > 0 ? (
                    <div className="dealerships-results--container">
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
                </div>
            

                {employeeTypes !== undefined ? (
                    <>
                        <label className="employeeType--label">Employee Type:</label>
                        <select 
                            id="employee_type_id" 
                            onChange={handleEmployeeTypeSelect}
                            className="employeeType--select"
                        >
                            <option defaultValue={props.employee.employee_type}>{props.employee.employee_type}</option>
                            {employeeTypes.map(type => {
                                return (
                                    <option value={type.id}>
                                        {type.name}
                                    </option>
                                )
                            })}
                        </select>
                        </>
                ) : null}

                <button onClick={handleSubmit} className="updateEmployee--btn">
                    Update
                </button>

            </div>

        )}
        <button className="closeBtn" onClick={handleClose}>
            Cancel  
        </button>
        <div className="edit--switch">
            <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
            <FormControlLabel
                
                value="Edit"
                control={<Switch onClick={handleEditMode} color="primary" />}
                label="Update"
                labelPlacement="top"
            />
            </FormGroup>
            </FormControl>
        </div>
    </>
  );
};

export default EmployeeDetailModal;
