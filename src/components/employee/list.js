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
    const [creationView, setCreationView] = useState(false);

    const [filteredEmployee, setFilteredEmployee] = useState();

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
        
    }, [employees,detailsView, filteredEmployee]);

    return (
        <>
            {/* START OF CUSTOM MODAL */}
            {/* <div class="modal-bg">
                <div class="modal-box">
                    <div className="modalHeader">
                        Add Employee
                    </div>

                    <label className="name--label">First Name:</label>
                    <input
                        onChange={handleInputFieldChange}
                        id="first_name"
                        className="modal--input"
                        type="text"
                    />

                    <label className="name--label">Last Name:</label>
                    <input
                        onChange={handleInputFieldChange}
                        id="last_name"
                        className="modal--input"
                        type="text"
                    />

                    <label className="name--label">Email:</label>
                    <input
                        onChange={handleInputFieldChange}
                        id="email_address"
                        className="modal--input"
                        type="text"
                    />

                    <label className="name--label">Phone:</label>
                    <input
                        onChange={handleInputFieldChange}
                        id="phone"
                        className="modal--input"
                        type="text"
                    /> */}

                    {/* DROPDOWN MENU START */}
                    {/* <label className="name--label dealership--label">Dealership:</label>
                    <div
                        onBlur={handleDropdownClose}
                        className={`dealership-list--dropdown ${open ? "open" : ""}`}
                    >
                        <input
                            className="dealership--search"
                            type="text"
                            onChange={handleDealershipSearch}
                            placeholder="Search Dealerships"
                            value={`${selectedDealership !== "" ? selectedDealership : query
                                }`}
                        />

                        {dealerships.length > 0 ? (
                            <div className="dealerships-results--container">
                                {dealerships.map((dealership) => {
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
                                    );
                                })}
                            </div>
                        ) : null}
                    </div> */}
                    {/* DROPDOWN MENU END */}

                    {/* {employeeTypes !== undefined ? (
                        <>
                            <label className="employeeType--label">
                                Select Employee Type
                            </label>
                            <select
                                id="employee_type_id"
                                onChange={handleInputFieldChange}
                                className="employeeType--select"
                            >
                                {" "}
                                <option value="none" selected disabled hidden>
                                    Select an Option
                                </option>
                                {employeeTypes.map((type) => {
                                    return (
                                        <>
                                            <option value={type.id}>{type.name}</option>
                                        </>
                                    );
                                })}
                            </select>
                        </>
                    ) : null}
                    <div classname="addEmployee--btn--container">
                        <button onClick={handleSubmit} className="modal--addBtn addEmployee--btn">
                            Add Employee 
                        </button>
                        <button className="closeBtn" onClick={handleClose}>
                            Close  
                        </button>
                    </div>
                </div>
            </div> */}
            {/* END OF CUSTOM MODAL */}

            {/* The double-click issue is b/c on first click the modal changes from 'AddEmployee' to
            'EmployeeDetail' ... Then on second click the ternary opens the 'EmployeeDetail' modal.  */}

            <ModalWrapper 
                filteredEmployee={filteredEmployee} 
                setCreationView={setCreationView} 
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
