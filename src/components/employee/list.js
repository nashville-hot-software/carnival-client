import React, { useState, useEffect } from "react";
import EmployeeCard from "./card";
import EmployeeManager from "../../api/dataManager";
import "../../styles/employees/list.css"
import ModalWrapper from "../modal/modalWrapper"
import { modal } from "../../modules/modal/helpers"

const Employees = (props) => {
    const [employees, setEmployees] = useState([]);
    const [creationView, setCreationView] = useState(false);
    const [filteredEmployee, setFilteredEmployee] = useState();
    
    // below 3 states are for useEffect to re-render search page with user's query
    // to reflect realtime updates/deletes from the modal form
    const [editMode, setEditMode] = useState(false);
    const [employeeDeleted, setEmployeeDeleted] = useState(false);
    const [query, setQuery] = useState();

    const handleEmployeeSearch = (evt) => {
        if (evt.target.value.length > 0) {
            // set the query state to re-search later after updates/deletes
            setQuery(evt.target.value);

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
        modal.handleDetailsShow(setEmployeeDeleted);
        
        const foundEmployee = employees.filter(matchedEmployee => matchedEmployee.id === employeeArg.id);
        setFilteredEmployee(foundEmployee[0]);
    }

    // this reflects the employee update in the search list realtime by re-searching for the
    // employee when edit mode switched off
    useEffect(() => {
        EmployeeManager.getAll("employees", "searchTerm", query).then(
            (matchedEmployees) => {
                setEmployees(matchedEmployees);
            }
        );
    }, [editMode, employeeDeleted])

    return (
        <>
            <ModalWrapper 
                filteredEmployee={filteredEmployee} 
                setCreationView={setCreationView}
                employeeCreationView={creationView}
                editMode={editMode}
                setEditMode={setEditMode}
                setEmployeeDeleted={setEmployeeDeleted}
            />
                
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
                                            showDetailsModal={showDetailsModal}
                                            {...props}
                                        />
                                    );
                                })}
                            </>
                        ) : null}
                    </div>

                    <button onClick={() => modal.handleShow(setCreationView)} className="addEmployee--btn">
                        Add New Employee
                    </button>
                </div>
            </div>
        </>
    );
};

export default Employees;
