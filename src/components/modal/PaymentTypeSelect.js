import React, { useState, useEffect } from "react";


import "../employee/list.css";

const PaymentTypeSelectDropdown = (props) => {


    const handlePaymentTypeSelect = (evt) => {
        const stateToChange = { ...props.sale };
        stateToChange[evt.target.id] = evt.target.value;
        props.setSale(stateToChange);
    };
    let paymentTypes =["mastercard","visa","americanexpress","discover","capitalone"]

    useEffect(() => {

    }, [props.selectedPaymentType]);

    return (
        <>
            {props.selectedPaymentType !== undefined ? (
                <>


                    <select
                        onChange={handlePaymentTypeSelect}
                        id="payment_method"
                        className="sale-type--select"
                        defaultValue={props.selectedPaymentType}
                    >
                        <option value={props.selectedPaymentType}>{props.selectedPaymentType}</option>
                        {props.selectedPaymentType !== undefined
                            ? paymentTypes.map((item, i) => {
                                return <option key={i} value={item}>{item}</option>;
                            })
                            : null}
                    </select>
                </>
            ) : null}
        </>
    );
};

export default PaymentTypeSelectDropdown;