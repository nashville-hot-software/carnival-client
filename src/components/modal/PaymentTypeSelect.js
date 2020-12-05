import React, {useEffect } from "react";
import "../employee/list.css";

const PaymentTypeSelectDropdown = (props) => {


    const handlePaymentTypeSelect = (evt) => {
        const stateToChange = props.state;
        stateToChange[evt.target.id] = evt.target.value;
        props.setSale(stateToChange);
    };

    let paymentTypes =
        ["Mastercard",
            "Visa",
            "American Express",
            "Discover",
            "Capital One"]

    useEffect(() => {
    }, [props.selectedPaymentType]);

    return (
        <>
            {props.selectedPaymentType !== undefined ? (
                <>

                    <label className="name--label">Payment Method</label>
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