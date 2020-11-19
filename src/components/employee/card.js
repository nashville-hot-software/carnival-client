import React from "react";

const EmployeeCard = props => {

  return (
    <>
        <div onClick={() => props.showDetailsModal(props.employee)} className="employee-card--container">
            <h2 className="employee-card--name">
              {`${props.employee.first_name} ${props.employee.last_name}, `}
            </h2>
            <span className="employeeDealership">{`${props.employee.business_name}`}</span>
        </div>
    </>
  );
};

export default EmployeeCard;
