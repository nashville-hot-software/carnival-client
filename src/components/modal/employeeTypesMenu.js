import React, { useState, useEffect } from "react";
import EmployeeManager from "../../api/dataManager";
import "../employee/list.css";

const EmployeeTypeSelect = (props) => {

    const [employeeTypes, setEmployeeTypes] = useState([]);

    const fetchEmployeeTypes = () => {
        EmployeeManager.getAll("employeetypes").then((employeeTypes) => {
            setEmployeeTypes(employeeTypes);
        });
    };

    const handleEmployeeTypeSelect = (evt) => {
        const stateToChange = { ...props.state };
        stateToChange[evt.target.id] = evt.target.value;
        props.setState(stateToChange);
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
        </>
    );
};

export default EmployeeTypeSelect;
