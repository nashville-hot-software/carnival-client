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

  // Handlers for showing/hiding modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  const handleEmployeeSearch = evt => {
    EmployeeManager.getAll("employees","searchTerm",evt.target.value)
      .then(matchedEmployees => {
        console.log(matchedEmployees)
        setEmployees(matchedEmployees);
    });
  }
  
  const fetchEmployeeTypes = () => {
    EmployeeManager.getAll("employeetypes")
      .then(employeeTypes => {
        setEmployeeTypes(employeeTypes);
    });
  }

  const handleInputFieldChange = evt => {
    const stateToChange = {...newEmployee}
    stateToChange[evt.target.id] = evt.target.value
    setNewEmployee(stateToChange)
  }

  const handleDealershipSearch = evt => {
    EmployeeManager.getAll("dealerships","searchTerm",evt.target.value)
      .then(matchedDealerships => {
        setDealerships(matchedDealerships);
    });
  }
  
  const handleDealerSelect = evt => {
    const stateToChange = {...newEmployee}
    stateToChange.dealership_id = evt.target.id
    setNewEmployee(stateToChange)
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
  }, [])

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
            
            {employees !== undefined ? (
                <div className="searchResults">
                    {employees.map((employee, i) => {
                        return (
                        <EmployeeCard
                            key={i}
                            employee={employee}
                            {...props}
                        />
                        );
                    })}
                </div>
            ) : null}

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
