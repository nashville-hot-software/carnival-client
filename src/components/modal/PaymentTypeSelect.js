import React, { useEffect } from "react";
import "../../styles/employees/list.css"

const PaymentTypeSelectDropdown = (props) => {
    const handlePaymentTypeSelect = (evt) => {
        const stateToChange = props.state;
        stateToChange[evt.target.id] = evt.target.value;
        if (props.setSale) {
            props.setSale(stateToChange);
        }

        else if (props.setNewSale) {

            props.setNewSale(stateToChange);

        }
    };

    let paymentTypes = [
        "Mastercard",
        "Visa",
        "American Express",
        "Discover",
        "Capital One",
    ];

    useEffect(() => { }, [props.selectedPaymentType]);

    return (
        <>
            {props.selectedPaymentType !== undefined ? (
                <>
                    <label className="name--label">Payment Method</label>
                    <select
                        onChange={handlePaymentTypeSelect}
                        id="payment_method"
                        className="modal--input"
                        defaultValue={props.selectedPaymentType}
                    >
                        <option value={props.selectedPaymentType}>
                            {props.selectedPaymentType}
                        </option>
                        {props.selectedPaymentType !== undefined
                            ? paymentTypes.map((item, i) => {
                                return (
                                    <option key={i} value={item}>
                                        {item}
                                    </option>
                                );
                            })
                            : null}
                    </select>
                </>
            ) : (
                    <>
                        <label className="name--label">Payment Method</label>
                        <select
                            onChange={handlePaymentTypeSelect}
                            id="payment_method"
                            className="modal--input"
                            defaultValue="0"
                        >
                            <option value="0">
                                choose a payment type
                            </option>
                            {paymentTypes.map((item, i) => {
                                return (
                                    <option key={i} value={item}>
                                        {item}
                                    </option>
                                );
                            })
                            }
                        </select>
                    </>
                )}
        </>
    );
};

export default PaymentTypeSelectDropdown;
