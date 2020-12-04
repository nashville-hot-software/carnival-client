import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import NumberFormat from 'react-number-format';

const useStyles = makeStyles((theme) => ({
    searchBarStyle: {
        height: "25px",
        width: "350px",
        margin: "0 0 0 0",
        float: "center",
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderRadius: "5px",
                borderColor: "#6a78d1",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#6a78d1;",
                borderWidth: "1px",
            },
        },
    },
}));
const Input = {
    FirstName: (props) => {
        const classes = useStyles();
        return (
            <>
                <label>First Name:</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="first_name"
                    className={classes.searchBarStyle}
                    type="text"
                    placeholder={props.sale.first_name}
                    autoFocus

                />
            </>
        );
    },

    LastName: (props) => {
        const classes = useStyles();
        return (
            <>
                <label>Last Name:</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="last_name"
                    className={classes.searchBarStyle}
                    type="text"
                    placeholder={props.sale.last_name}
                    autoFocus

                />
            </>
        );
    },
    Email: (props) => {
        const classes = useStyles();
        return (
            <>
                <label>Email:</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="email"
                    className={classes.searchBarStyle}
                    type="text"
                    placeholder={props.sale.email}
                    autoFocus

                />
            </>
        );
    },
    Street: (props) => {
        const classes = useStyles();
        return (
            <>
                <label>Street:</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="street"
                    className={classes.searchBarStyle}
                    type="text"
                    placeholder={props.sale.street}
                    autoFocus

                />
            </>
        );
    },
    City: (props) => {
        const classes = useStyles();
        return (
            <>
                <label>City:</label>
                <input
                    type="text"
                    placeholder={props.sale.city}
                    id="city"
                    onChange={props.handleInputFieldChange}
                    className={classes.searchBarStyle}
                    autoFocus

                />
            </>
        );
    },
    ZipCode: (props) => {
        const classes = useStyles();
        return (
            <>
                <label>Zipcode:</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="zipcode"
                    className={classes.searchBarStyle}
                    type="text"
                    placeholder={props.sale.zipcode}
                    autoFocus

                />
            </>
        );
    },
    CompanyName: (props) => {
        const classes = useStyles();
        return (
            <>
                <label>Company Name:</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="company_name"
                    className={classes.searchBarStyle}
                    type="text"
                    placeholder={props.sale.company_name}
                    autoFocus

                />
            </>
        );
    },
    Deposit: (props) => {
        const classes = useStyles();
        // let depositFormat = <NumberFormat value={props.sale.deposit} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        return (
            <>

                <label>Deposit:</label>
                <input
                    onChange={props.handleInputFieldChange}
                    type="text"
                    placeholder={`$${props.sale.deposit}`}
                    id="deposit"
                    className={classes.searchBarStyle}
                    autoFocus

                />
            </>
        );
    },
    Price: (props) => {
        const classes = useStyles();
        // let priceFormat = <NumberFormat value={props.sale.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        return (
            <>
                <label>Price:</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="price"
                    className={classes.searchBarStyle}
                    type="text"
                    placeholder={`$${props.sale.price}`}
                    autoFocus
                />
            </>
        );
    },
    Phone: (props) => {
        const classes = useStyles();
        return (
            <>
                <label>Phone:</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="phone"
                    className={classes.searchBarStyle}
                    type="text"
                    placeholder={props.sale.phone}
                    autoFocus
                />
            </>
        );
    },
    PurchaseDate: (props) => {
        const classes = useStyles();
        return (
            <>
                <label>Purchase Date</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="purchase_date"
                    className={classes.searchBarStyle}
                    type="date"
                    autoFocus
                />
            </>
        );
    },
    PickupDate: (props) => {
        const classes = useStyles();
        return (
            <>
                <label>Pickup Date</label>
                <input
                    onChange={props.handleInputFieldChange}
                    id="pickup_date"
                    className={classes.searchBarStyle}
                    type="date"
                    autoFocus
                />
            </>
        );
    },
};
export default Input;
