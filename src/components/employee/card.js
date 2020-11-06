import React, { useState } from "react";
import EmployeeManager from "../../api/dataManager";
// import "./card.css"

const EmployeeCard = props => {

  const [employee, setEmployee] = useState(props.employee);

  return (
    <>
        <div className="employee-card--container">
            <h2 className="employee-card--name">{`${employee.first_name} ${employee.last_name}`}</h2>
        </div>
    </>
  );
};

export default EmployeeCard;
