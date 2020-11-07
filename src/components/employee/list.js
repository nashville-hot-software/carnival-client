import React, { useState, useEffect } from "react";
import EmployeeCard from "./card";
import EmployeeManager from "../../api/dataManager";
import "./list.css"
import Modal from 'react-bootstrap/Modal';

const Employees = props => {

  const [employees, setEmployees] = useState([]);
  const [employeeTypes, setEmployeeTypes] = useState([]);

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

  const handleFieldChange = evt => {
    EmployeeManager.getAll("employees","searchTerm",evt.target.value)
      .then(matchedEmployees => {
        setEmployees(matchedEmployees);
    });
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
                onChange={handleFieldChange} 
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
                <Modal.Body>
                    <label className="name--label">First Name:</label>
                    <input type="text"/>
                </Modal.Body>
                <Modal.Body>
                    <label className="name--label">Last Name:</label>
                    <input type="text"/>
                </Modal.Body>
                <Modal.Body>
                    <label className="name--label">Email:</label>
                    <input type="text"/>
                </Modal.Body>
                <Modal.Body>
                    <label className="name--label">Phone:</label>
                    <input type="text"/>
                </Modal.Body>

                {/* TODO: For the dealership, will need a submenu to search dealerships.... */}
                <Modal.Body>
                    <label className="name--label">Dealership:</label>
                    <select>
                            {employeeTypes.map(type => {
                                return (
                                    <option>{type.name}</option>
                                )
                            })}
                        </select>
                </Modal.Body>
                
                {employeeTypes !== undefined ? (
                    <Modal.Body>
                        <label className="name--label">Employee Type:</label>
                        <select>
                            {employeeTypes.map(type => {
                                return (
                                    <option>{type.name}</option>
                                )
                            })}
                        </select>
                    </Modal.Body>
                ) : null}
            </Modal>
        </div>
    </div>
  );
};

export default Employees;
