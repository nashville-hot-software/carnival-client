import React, { useState, useEffect } from "react";
import EmployeeCard from "./card";
import EmployeeManager from "../../api/dataManager";
import "./list.css";
import ModalWrapper from "../modal/modalWrapper"

const Employees = (props) => {
    const [employees, setEmployees] = useState([]);
    
    const [creationView, setCreationView] = useState(false);
    const [filteredEmployee, setFilteredEmployee] = useState();

    const handleEmployeeSearch = (evt) => {
        if (evt.target.value.length > 0) {
            EmployeeManager.getAll("employees", "searchTerm", evt.target.value).then(
                (matchedEmployees) => {
                    setEmployees(matchedEmployees);
                }
            );
        } else {
            setEmployees([]);
        }
    };

    // Runs when you click on employee card for details
    const showDetailsModal = employeeArg => {
        const foundEmployee = employees.filter(matchedEmployee => matchedEmployee.id === employeeArg.id);

        console.log(foundEmployee)

        // document.querySelector(".modal-box").classList.remove("fade-out");
        // document.querySelector(".modal-bg").classList.remove("fade-out");
        document.querySelector(".modal-box").classList.add("show");
        // document.querySelector(".modal-bg").classList.add("show");

        // NOTE: thinking if we can get editModal useEffect to watch for this to update when
        // different employee is clicked, that could re-render the modal correctly....
        setFilteredEmployee(foundEmployee[0]);
    }

    // Probably don't need this guy... Just one to open modal and the different clicks
    // will update different states for the modal create/details/edit modes
    const handleShow = () => {
        setCreationView(true)

        // document.querySelector(".modal-box").classList.remove("fade-out");
        // document.querySelector(".modal-bg").classList.remove("fade-out");
        document.querySelector(".modal-box").classList.add("show");
        // document.querySelector(".modal-bg").classList.add("show");
    };

    return (
        <>
            <ModalWrapper 
                filteredEmployee={filteredEmployee} 
                setCreationView={setCreationView}
                employeeCreationView={creationView}
                {...props}
            />
                
            {/* EMPLOYEE SEARCH PAGE */}
            <div className="employees--container">
                <div className="employees--subContainer">
                    <div className="employees--header">
                        Employees
                    </div>

                    <input
                        className="employees-searchBar"
                        type="text"
                        onChange={handleEmployeeSearch}
                        placeholder="Search for Employees"
                    />

                    <div className="searchResults employee">
                        {employees.length > 0 ? (
                            <>
                                {employees.map((employee, i) => {
                                    return (
                                        <EmployeeCard
                                            key={i}
                                            employee={employee}
                                            // handleDropdownClose={handleDropdownClose}
                                            showDetailsModal={showDetailsModal}
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
                </div>
            </div>
        </>
    );
};

export default Employees;
