import React, { useState, useEffect } from "react";
import USAStatesArray from "../usaStateArray/stateList";
import "../employee/list.css";

const StateSelectDropdown = (props) => {

    const [states, setStates] = useState(USAStatesArray);

    const handleStateTypeSelect = (evt) => {
        const stateToChange = props.state;
        stateToChange[evt.target.id] = evt.target.value;
        //this setter is for the edit form
        if (props.setSale) {
            props.setSale(stateToChange);
        } else if(props.setNewSale) {
            // this setter is for the add form
            props.setNewSale(stateToChange);
        }
    };

    useEffect(() => { }, [props.selectedState]);

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
            ) : <select
                className="employeeType--select"
                onChange={handleStateTypeSelect}
                defaultValue="select a state"
                id="state">
                    <option value="select a state">Select a state</option>
                    {states !== undefined
                        ? states.map((state, i) => {
                            return <option key={i} value={state.id}>{state.name}</option>;
                        })
                        : null}
                </select>}
        </>
    );
};

export default StateSelectDropdown;
