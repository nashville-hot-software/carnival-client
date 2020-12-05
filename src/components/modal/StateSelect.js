import React, { useState, useEffect } from "react";
import USAStatesArray from "../usaStateArray/stateList";
import "../employee/list.css";

const StateSelectDropdown = (props) => {

    const [states, setStates] = useState(USAStatesArray);
    
    const handleStateTypeSelect = (evt) => {
        const stateToChange = props.state;
        stateToChange[evt.target.id] = evt.target.value;
        props.setSale(stateToChange);
        props.setNewSale(stateToChange);
    };

    useEffect(() => {}, [props.selectedState]);

    return (
        <>
            {props.selectedState !== undefined ? (
                <>
                    <select
                        className="employeeType--select"
                        onChange={handleStateTypeSelect}
                        defaultValue={props.selectedState}
                        id="state">
                        <option value={props.selectedState}>{props.selectedState}</option>
                        {states !== undefined
                            ? states.map((state, i) => {
                                return <option key={i} value={state.id}>{state.name}</option>;
                            })
                            : null}
                    </select>
                </>
            ) : null}
        </>
    );
};

export default StateSelectDropdown;
