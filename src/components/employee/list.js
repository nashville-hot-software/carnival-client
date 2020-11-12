import React, { useState, useEffect } from "react";
import EmployeeCard from "./card";
import EmployeeManager from "../../api/dataManager";
import "./list.css"
import Modal from 'react-bootstrap/Modal';

const Employees = props => {

  // Holds all employees returned from employee search bar
  const [employees, setEmployees] = useState([]);

  // Skeleton for new employee to be POSTed
  const [newEmployee, setNewEmployee] = useState({
    first_name: "",
    last_name: "",
    email_address: "",
    phone: "",
    dealership_id: 0,
    employee_type_id: 0
  })

  // Holds all employee types for the sub-select menu in employee creation form
  const [employeeTypes, setEmployeeTypes] = useState([]);
  
  // Holds all dealerships for the sub-select menu in employee creation form
  const [dealerships, setDealerships] = useState([]);

  // State for hiding/showing modal
  const [show, setShow] = useState(false);
  
  // State for expanding/hiding the dealership dropdown menu
  const [open, setOpen] = useState(false);

  // Holds selected dealership from dropdown menu to display as updated value of
  // dealership input field
  const [selectedDealership, setSelectedDealership] = useState("");
  
  // Holds dealership query being typed in to show as input field value (before 
  // dealership selection)
  const [query, setQuery] = useState("");

  // Handlers for showing/hiding modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Handler for closing the dealership dropdown onBlur
  const handleDropdownClose = () => setOpen(false)
  
  // Pings API for all employees (basic employee search page, not the modal)
  const handleEmployeeSearch = evt => {
    if (evt.target.value.length > 0) {
        EmployeeManager.getAll("employees","searchTerm",evt.target.value)
        .then(matchedEmployees => {
            setEmployees(matchedEmployees);
        });
    } else {
        setEmployees([])
    }
  }
  
  // Fetching all employee types from DB to populate the employee type dropdown in the form
  const fetchEmployeeTypes = () => {
    EmployeeManager.getAll("employeetypes")
      .then(employeeTypes => {
        setEmployeeTypes(employeeTypes);
    });
  }

  // Building out the new employee obj to be posted
  const handleInputFieldChange = evt => {
    const stateToChange = {...newEmployee}
    stateToChange[evt.target.id] = evt.target.value
    setNewEmployee(stateToChange)
  }

  // Pings API for all dealerships matching dealership input value ,
  // Setting query state for the input field so we can dynamically set the value of the text input,
  // Conditionals to either search for dealerships and map the list, OR set a selected dealership
  // to show as the new input value
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
    }
  }
  
  // Add new dealership ID to new employee object state,
  // Set the selected dealership state to display selected
  // dealership as value in dealership search bar,
  // then auto-scroll back to top of scrollable div before
  // contracting the menu
  const handleDealerSelect = evt => {
    const stateToChange = {...newEmployee}
    stateToChange.dealership_id = evt.target.id
    setNewEmployee(stateToChange)
    
    setSelectedDealership(evt.target.innerHTML)

    const dropdownDiv = document.querySelector('.dealership-list--dropdown')
    dropdownDiv.scrollTop = 0;
  }

  const handleSubmit = () => {
    if (newEmployee.first_name === "" || newEmployee.last_name === "") {
        window.alert("Please fill out employee name fields")
    } else if (newEmployee.email_address === "") {
        window.alert("Please enter an email address")
    } else if (newEmployee.phone === "") {
        window.alert("Please enter a phone number")
    } else if (newEmployee.dealership_id === 0) {
        window.alert("Please select a valid dealership")
    } else if (newEmployee.employee_type_id === 0) {
        window.alert("Please select a valid employee type")
    } else {
        EmployeeManager.PostData("employees", newEmployee)
            .then(() => setShow(false))
    }
  } 

  useEffect(() => {
    fetchEmployeeTypes();
  }, [employees])

  return (
    <div className="employees--container">
        <div className="employees--subContainer">
            <div className="employees--header">
                Employees
            </div>

            <input 
                className="employees-searchBar" 
                type='text' 
                onChange={handleEmployeeSearch} 
                placeholder="Search for Employees" 
            />
            
            <div className="searchResults">
                {employees.length > 0 ? (
                <>
                {employees.map((employee, i) => {
                    return (
                    <EmployeeCard
                        key={i}
                        employee={employee}
                        handleDropdownClose={handleDropdownClose}
                        {...props}
                    />
                    );
                })}
                </>
                ) : null}
            </div>

            <button onClick={() => handleShow()} className="addEmployee--btn">
                Add New Employee
            </button>

            <Modal className="modal--form" show={show} onHide={handleClose}>
                <Modal.Header className="modalHeader" closeButton>
                    <Modal.Title>Add Employee</Modal.Title>
                </Modal.Header>
                <div className="modalBody">
                    <Modal.Body className="fieldset">
                        <label className="name--label">First Name:</label>
                        <input onChange={handleInputFieldChange} id="first_name" className="modal--input" type="text"/>

                        <label className="name--label">Last Name:</label>
                        <input onChange={handleInputFieldChange} id="last_name" className="modal--input" type="text"/>

                        <label className="name--label">Email:</label>
                        <input onChange={handleInputFieldChange} id="email_address" className="modal--input" type="text"/>

                        <label className="name--label">Phone:</label>
                        <input onChange={handleInputFieldChange} id="phone" className="modal--input" type="text"/>

                        {/* This block is for the dealership search dropdown menu (lines 157-184) */}
                        <label className="name--label dealership--label">Dealership:</label>
                        <div onBlur={handleDropdownClose} className={`dealership-list--dropdown ${open ? 'open' : ''}`}>
                            <input 
                                className="dealership--search" 
                                type="text" 
                                onChange={handleDealershipSearch} 
                                placeholder="Search Dealerships"
                                value={`${selectedDealership !== "" ? selectedDealership : query}`}
                            />

                            {dealerships.length > 0 ? (
                                <div className="dealerships-results--container">
                                    {dealerships.map(dealership => {
                                        return (
                                        <>
                                            <div 
                                                className={"dealership--select"}
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
                                    onChange={handleInputFieldChange}
                                    className="employeeType--select"
                                >
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

                        <button onClick={handleSubmit} className="modal--addBtn addEmployee--btn">
                            Submit
                        </button>
                    </Modal.Body>
                </div>
            </Modal>
        </div>
    </div>
  );
};

export default Employees;
