import React, { useState, useEffect } from "react";
import EmployeeCard from "./card";
import EmployeeManager from "../../api/dataManager";
import "./list.css"
import Modal from 'react-bootstrap/Modal';

const Employees = props => {

  const [employees, setEmployees] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [dealerships, setDealerships] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    first_name: "",
    last_name: "",
    email_address: "",
    phone: "",
    dealership_id: 1,
    employee_type_id: 1
  })

  // Below 3 are for Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchEmployeeTypes = () => {
    EmployeeManager.getAll("employeetypes")
      .then(employeeTypes => {
        console.log(employeeTypes)
        setEmployeeTypes(employeeTypes);
    });
  }

  const handleEmployeeSearch = evt => {
    EmployeeManager.getAll("employees","searchTerm",evt.target.value)
      .then(matchedEmployees => {
        setEmployees(matchedEmployees);
    });
  }

  const handleInputFieldChange = evt => {
    console.log(evt.target.id)
    
    const stateToChange = {...newEmployee}
    stateToChange.evt.target.id = evt.target.value
  }

  const handleDealershipSearch = evt => {
    EmployeeManager.getAll("dealerships","searchTerm",evt.target.value)
      .then(matchedDealerships => {
        console.log(matchedDealerships)
        setDealerships(matchedDealerships);
    });
  }
  
  const handleDealerSelect = evt => {
    console.log(evt.target.id)

    const stateToChange = {...newEmployee}
    stateToChange.dealership_id = evt.target.id
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
                    {employees.map(employee => {
                        return (
                        <EmployeeCard
                            key={employee.id}
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
                <Modal.Header closeButton>
                    <Modal.Title>Add Employee</Modal.Title>
                </Modal.Header>
                <div className="modalBody">
                    <Modal.Body className="fieldset">
                        <label className="name--label">First Name:</label>
                        <input onChange={handleInputFieldChange} id="first_name" className="modal--input" type="text"/>
                    </Modal.Body>
                    <Modal.Body className="fieldset">
                        <label className="name--label">Last Name:</label>
                        <input onChange={handleInputFieldChange} id="last_name" className="modal--input" type="text"/>
                    </Modal.Body>
                    <Modal.Body className="fieldset">
                        <label className="name--label">Email:</label>
                        <input onChange={handleInputFieldChange} id="email" className="modal--input" type="text"/>
                    </Modal.Body>
                    <Modal.Body className="fieldset">
                        <label className="name--label">Phone:</label>
                        <input onChange={handleInputFieldChange} id="phone" className="modal--input" type="text"/>
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
                                        {/* <input 
                                            type="hidden" 
                                            id="dealership_id"
                                            value={dealership.id} 
                                            onClick={handleDealerSelect} 
                                        /> */}
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
                            <select>
                                {employeeTypes.map(type => {
                                    return (
                                        <option 
                                            onClick={handleInputFieldChange}
                                            id="employee_type_id"
                                            value={type.id}
                                        >
                                            {type.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </Modal.Body>
                    ) : null}
                </div>
            </Modal>
        </div>
    </div>
  );
};

export default Employees;
