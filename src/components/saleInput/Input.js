import React from "react";
import "../sale/editForm.css"

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
                    type="text"
                    placeholder={props.sale ? props.sale.email : "Email"}

                />
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
                        value={props.selectedVehicle ? `$${props.selectedVehicle.price}`: "" }
                        placeholder={props.sale ? `$${props.sale.price}` : "Price"}
                    />
                    </>
                ) : (
                    <>
                    <label style={{marginTop: "20px"}}>Price:</label>
                    <div>
                        {props.selectedVehicle ? `$${props.selectedVehicle.price}`: "" }
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
