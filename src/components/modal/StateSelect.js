import React, { useState, useEffect } from "react";
import USAStatesArray from "../usaStateArray/stateList";
import "../../styles/employees/list.css"

const StateSelectDropdown = (props) => {

    const [states, setStates] = useState(USAStatesArray);

    const handleStateTypeSelect = (evt) => {
        const stateToChange = {...props.state};
        stateToChange[evt.target.id] = evt.target.value;
        props.setState(stateToChange);
    };

    const stateLocale = props.state.state;
    
    return (
        <>
            {stateLocale !== undefined ? (
                <>
                    <label>Select a State</label>
                    <select
                        className="modal--input"
                        onChange={handleStateTypeSelect}
                        defaultValue={stateLocale}
                        id="state">
                        <option value={stateLocale}>{stateLocale}</option>
                        {states !== undefined
                            ? states.map((state, i) => {
                                return <option key={i} value={state.id}>{state.name}</option>;
                            })
                            : null}
                    </select>
                </>
            ) : (
            <>
                <label>Select a State</label>
                <select
                className="modal--input"
                onChange={handleStateTypeSelect}
                defaultValue="0"
                id="state">
                    <option value="0">Select a state</option>
                    {states !== undefined
                        ? states.map((state, i) => {
                            return <option key={i} value={state.id}>{state.name}</option>;
                        })
                        : null}
                </select>
            </>
            )}
        </>
    );
};

export default StateSelectDropdown;
