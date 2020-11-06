import React, { useState, useEffect } from "react";
import EmployeeCard from "./card";
import EmployeeManager from "../../api/dataManager";
import "./list.css"

const Employees = props => {

  const [employees, setEmployees] = useState([]);

  const handleFieldChange = evt => {
    EmployeeManager.getAll("employees","searchTerm",evt.target.value)
      .then(matchedEmployees => {
        setEmployees(matchedEmployees);
    });
  }

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

            {/* <div className="btn-hover-zoom"> */}
                <button className="addEmployee--btn">
                    Add New Employee
                </button>
            {/* </div> */}
        </div>
    </div>
  );
};

export default Employees;
