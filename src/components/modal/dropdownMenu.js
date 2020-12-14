import React from "react"
import NumberFormat from "react-number-format";

const DropdownMenu = props => {

    return (
        <>
        <label className="name--label dealership--label">{`${props.label}:`}</label>
        <div
            onBlur={props.handleDropdownClose}
            className={
                `${props.label === "Dealerships" ? "dealership-list--dropdown" : 
                "vehicles--dropdown" } ${props.open ? "open" : ""}`
            }
        >
            <input
                className="dealership--search"
                type="text"
                onChange={props.handleSearch}
                placeholder={`Search ${props.label}`}
                value={`${props.selectedOption !== undefined ? props.selectedOption : props.query}`}
            />

            {props.list.length > 0 ? (
                <div className="dealerships-results--container">
                    {props.list.map((item) => {
                        return (
                            <>
                                {item.business_name !== undefined ? (
                                    <div
                                        className={"dealership--select"}
                                        id={item.id}
                                        onClick={props.handleSelect}
                                    >
                                        {item.business_name}
                                    </div>
                                ) : null}
                                
                                {item.model !== undefined ? (
                                    <div
                                        className="vehicles--select"
                                        id={item.id}
                                        title={item.floor_price}
                                        onClick={props.handleSelect}
                                    >
                                        <div className="vehicle--title">
                                            {`${item.make} ${item.model}`}
                                        </div>
                                        <div className="vehicle--price">
                                            <NumberFormat
                                                value={item.floor_price}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                                prefix={"$"}
                                            />
                                        </div>
                                        <span
                                            className="vin"
                                            id={item.id}
                                            title={item.floor_price}
                                            style={{pointerEvents: "none"}}
                                        >
                                            #{item.vin}
                                        </span>
                                    </div>
                                ) : null}
                            </>
                        );
                    })}
                </div>
            ) : null}
        </div>
        </>
    );
}

export default DropdownMenu;