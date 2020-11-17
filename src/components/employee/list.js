import React, { useState, useEffect } from "react";
import EmployeeCard from "./card";
import EmployeeManager from "../../api/dataManager";
import "./list.css";
import AddEmployeeModal from "./modalAddForm"
import EmployeeDetailModal from "./modalEditForm"
import ModalWrapper from "./modalWrapper"
import CircularIndeterminate from "./spinner"
import Modal from "react-bootstrap/Modal";

const Employees = (props) => {
    // Holds all employees returned from employee search bar
    const [employees, setEmployees] = useState([]);
    
    const [detailsView, setDetailsView] = useState(false);
    const showDetailsModal = employeeArg => {
        setDetailsView(true);

        const foundEmployee = employees.filter(matchedEmployee => matchedEmployee.id === employeeArg.id);

        // document.querySelector(".modal-box").classList.remove("fade-out");
        // document.querySelector(".modal-bg").classList.remove("fade-out");
        document.querySelector(".modal-box").classList.add("show");
        document.querySelector(".modal-bg").classList.add("show");

        console.log(foundEmployee);

        setFilteredEmployee(foundEmployee[0]);
    }

    // State for expanding/hiding the dealership dropdown menu
    const [open, setOpen] = useState(false);

    const handleShow = () => {
        setCreationView(true)

        document.querySelector(".modal-box").classList.remove("fade-out");
        document.querySelector(".modal-bg").classList.remove("fade-out");
        document.querySelector(".modal-box").classList.add("show");
        document.querySelector(".modal-bg").classList.add("show");
    };

    // Handler for closing the dealership dropdown onBlur
    const handleDropdownClose = () => setOpen(false);

    // Pings API for all employees (basic employee search page, not the modal)
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
        
    }, [employees]);

    return (
        <>
            <ModalWrapper 
                filteredEmployee={filteredEmployee} 
                setCreationView={setCreationView}
                creationView={creationView}
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

                    <div className="searchResults">
                        {employees.length > 0 ? (
                            <>
                                {employees.map((employee, i) => {
                                    return (
                                        <EmployeeCard
                                            key={i}
                                            employee={employee}
                                            handleDropdownClose={handleDropdownClose}
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
