import React from "react";

const Input = {
    FirstName: (props) => {
        return (
            <>
                <label>First Name:</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="first_name"
                    className="modal--input"
                    type="text"
                    placeholder={props.sale ? props.sale.first_name : "First Name"}

                />
            </>
        );
    },

    LastName: (props) => {
        // const classes = useStyles();
        return (
            <>
                <label>Last Name:</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="last_name"
                    className="modal--input"
                    type="text"
                    placeholder={props.sale ? props.sale.last_name : "Last_Name"}

                />
            </>
        );
    },
    Email: (props) => {
        // const classes = useStyles();
        return (
            <>
                <label>Email:</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="email"
                    className="modal--input"
                    type="email"
                    placeholder={props.sale ? props.sale.email : "Email"}

                />
                {props.errors.email !== '' ? <span className="errorMessage">{props.errors.email}</span> : null}
            </>
        );
    },
    Street: (props) => {
        // const classes = useStyles();
        return (
            <>
                <label>Street:</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="street"
                    className="modal--input"
                    type="text"
                    placeholder={props.sale ? props.sale.street : "Street"}

                />
            </>
        );
    },
    City: (props) => {
        // const classes = useStyles();
        return (
            <>
                <label>City:</label>
                <input
                    type="text"
                    placeholder={props.sale ? props.sale.city : "City"}
                    id="city"
                    onChange={props.handleInputFieldChange}
                    className="modal--input"

                />
            </>
        );
    },
    ZipCode: (props) => {
        // const classes = useStyles();
        return (
            <>
                <label>Zipcode:</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="zipcode"
                    className="modal--input"
                    type="text"
                    placeholder={props.sale ? props.sale.zipcode : "Zip"}
                />
                {props.errors.zipcode !== '' ? <span className="errorMessage">{props.errors.zipcode}</span> : null}

            </>
        );
    },
    CompanyName: (props) => {
        // const classes = useStyles();
        return (
            <>
                <label>Company Name:</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="company_name"
                    className="modal--input"
                    type="text"
                    placeholder={props.sale ? props.sale.company_name : "Company Name"}

                />
            </>
        );
    },
    Deposit: (props) => {
        // const classes = useStyles();
        // let depositFormat = <NumberFormat value={props.sale.deposit} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        return (
            <>

                <label>Deposit:</label>
                <input
                    onChange={props.handleInputFieldChange}
                    type="text"
                    placeholder={props.sale ? `$${props.sale.deposit}` : "Deposit"}
                    id="deposit"
                    className="modal--input"
                />
                {props.errors.deposit !== '' ? <span className="errorMessage">{props.errors.deposit}</span> : null}

            </>
        );
    },
    Price: (props) => {
        // const classes = useStyles();
        // let priceFormat = <NumberFormat value={props.sale.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        return (
            <>


                {props.sale ? (
                    <>
                        <label>Price:</label>
                        <input
                            onChange={props.handleInputFieldChange}
                            id="price"
                            className="modal--input"
                            type="text"
                            value={props.selectedVehicle ? `$${props.selectedVehicle.price}` : ""}
                            placeholder={props.sale ? `$${props.sale.price}` : "Price"}
                        />
                    </>
                ) : (
                        <>
                            <label style={{ marginTop: "20px" }}>Price:</label>
                            <div
                                className="modal--input"
                                style={{
                                    backgroundColor: "#fff",
                                    paddingTop: "4px"
                                }}
                            >
                                {props.selectedVehicle ? `$${props.selectedVehicle.price}` : <span style={{ color: 'gray' }}>Select a vehicle</span>}
                            </div>
                        </>
                    )}
            </>
        );
    },
    Phone: (props) => {
        // const classes = useStyles();
        return (
            <>
                <label>Phone:</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="phone"
                    className="modal--input"
                    type="text"
                    placeholder={props.sale ? props.sale.phone : "Phone"}
                />
                {props.errors.phone !== '' ? <span className="errorMessage">{props.errors.phone}</span> : null}

            </>
        );
    },
    PurchaseDate: (props) => {
        // const classes = useStyles();
        return (
            <>
                <label>Purchase Date</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="purchase_date"
                    className="modal--input"
                    type="date"
                />
            </>
        );
    },
    PickupDate: (props) => {
        // const classes = useStyles();
        return (
            <>
                <label>Pickup Date</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="pickup_date"
                    className="modal--input"
                    type="date"
                />
            </>
        );
    },
};
export default Input;
