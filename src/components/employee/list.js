import React, { useState, useEffect } from "react";
import EmployeeCard from "./card";
import EmployeeManager from "../../api/dataManager";
import "./list.css";
import ModalWrapper from "./modalWrapper"

const Employees = (props) => {
    // Holds all employees returned from employee search bar
    const [employees, setEmployees] = useState([]);
    
    const [detailsView, setDetailsView] = useState(false);
    const [creationView, setCreationView] = useState(false);

    const [filteredEmployee, setFilteredEmployee] = useState();

    const showDetailsModal = employeeArg => {
        setDetailsView(true);

        const foundEmployee = employees.filter(matchedEmployee => matchedEmployee.id === employeeArg.id);

        console.log(foundEmployee)

        // document.querySelector(".modal-box").classList.remove("fade-out");
        // document.querySelector(".modal-bg").classList.remove("fade-out");
        document.querySelector(".modal-box").classList.add("show");
        document.querySelector(".modal-bg").classList.add("show");

        setFilteredEmployee(foundEmployee[0]);
    }

    // const [open, setOpen] = useState(false);

    const handleShow = () => {
        setCreationView(true)

        document.querySelector(".modal-box").classList.remove("fade-out");
        document.querySelector(".modal-bg").classList.remove("fade-out");
        document.querySelector(".modal-box").classList.add("show");
        document.querySelector(".modal-bg").classList.add("show");
    };

    // const handleDropdownClose = () => setOpen(false);

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

    useEffect(() => {
        EmployeeManager.getAll("employees")
            .then(data => setEmployees(data));
    }, [])

    return (
        <>
            <ModalWrapper 
                filteredEmployee={filteredEmployee} 
                setCreationView={setCreationView}
                creationView={creationView}
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
