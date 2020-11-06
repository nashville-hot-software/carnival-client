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
    <>
      <div className="employees--container">
        <div className="employees--header">Employees</div>
        <input type='text' onChange={handleFieldChange} />
        
        {employees !== undefined ? (
          <div>
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
      </div>
    </>
  );
};

export default Employees;
