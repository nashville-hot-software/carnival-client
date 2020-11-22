import React, { useState, useEffect } from "react";
import EmployeeManager from "../../api/dataManager";
import "./list.css";

const EmployeeTypeSelect = (props) => {

    const [employeeTypes, setEmployeeTypes] = useState([]);

    const fetchEmployeeTypes = () => {
        EmployeeManager.getAll("employeetypes").then((employeeTypes) => {
            setEmployeeTypes(employeeTypes);
        });
    };

    const handleEmployeeTypeSelect = (evt) => {
        const stateToChange = props.state;
        stateToChange.employee_type_id = parseInt(evt.target.value);
    };

    useEffect(() => {
        fetchEmployeeTypes();
    }, []);

    return (
        <>
        {employeeTypes !== undefined ? (
            <>
                <label className="employeeType--label">
                    Select Employee Type
                </label>
                <select
                    id="employee_type_id"
                    onChange={handleEmployeeTypeSelect}
                    className="employeeType--select"
                >
                    {" "}
                    <option defaultValue="none" disabled hidden>
                        Select an Option
                    </option>
                    {employeeTypes.map((type, i) => {
                        return (
                            <>
                                <option key={i} value={type.id}>{type.name}</option>
                            </>
                        );
                    })}
                </select>
            </>
        ) : null}
        </>
    );
};

export default EmployeeTypeSelect;
