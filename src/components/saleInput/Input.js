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
                <label shrink>First Name:</label>
                    <input
                        onChange={props.handleInputFieldChange}
                        id="firstName"
                        className={classes.searchBarStyle}
                        type="text"
                        label={props.sale.first_name}
                        autoFocus
                        variant="outlined"
                    />
            </>
        );
    },

    LastName: (props) => {
        const classes = useStyles();
        return (
            <>
                <label shrink>Last Name:</label>
                    <input
                        onChange={props.handleInputFieldChange}
                        id="lastName"
                        className={classes.searchBarStyle}
                        type="text"
                        label={props.sale.last_name}
                        autoFocus
                        variant="outlined"
                    />
            </>
        );
    },
    Email: (props) => {
        const classes = useStyles();
        return (
            <>
                <label shrink>Email:</label>
                    <input
                        onChange={props.handleInputFieldChange}
                        id="email"
                        className={classes.searchBarStyle}
                        type="text"
                        label={props.sale.email}
                        autoFocus
                        variant="outlined"
                    />
            </>
        );
    },
    Phone: (props) => {
        const classes = useStyles();
        return (
            <>
                <label shrink>Phone:</label>
                    <input
                        onChange={props.handleInputFieldChange}
                        id="phone"
                        className={classes.searchBarStyle}
                        type="text"
                        label={props.sale.phone}
                        autoFocus
                        variant="outlined"
                    />
            </>
        );
    },
    Street: (props) => {
        const classes = useStyles();
        return (
            <>
                <label shrink>Street:</label>
                    <input
                        onChange={props.handleInputFieldChange}
                        id="street"
                        className={classes.searchBarStyle}
                        type="text"
                        label={props.sale.street}
                        autoFocus
                        variant="outlined"
                    />
            </>
        );
    },
    City: (props) => {
        const classes = useStyles();
        return (
            <>
                <label shrink>City:</label>
                    <input
                        type="text"
                        label={props.sale.city}
                        id="city"
                        onChange={props.handleInputFieldChange}
                        className={classes.searchBarStyle}
                        autoFocus
                        variant="outlined"
                    />
            </>
        );
    },
    ZipCode: (props) => {
        const classes = useStyles();
        return (
            <>
                <label shrink>Zipcode:</label>
                    <input
                        onChange={props.handleInputFieldChange}
                        id="zipcode"
                        className={classes.searchBarStyle}
                        type="text"
                        label={props.sale.zipcode}
                        autoFocus
                        variant="outlined"
                    />
            </>
        );
    },
    CompanyName: (props) => {
        const classes = useStyles();
        return (
            <>
                <label shrink>Company Name:</label>
                    <input
                        onChange={props.handleInputFieldChange}
                        id="companyName"
                        className={classes.searchBarStyle}
                        type="text"
                        label={props.sale.company_name}
                        autoFocus
                        variant="outlined"
                    />
            </>
        );
    },
    Deposit: (props) => {
        const classes = useStyles();
        let depositFormat = <NumberFormat value={props.sale.deposit} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        return (
            <>

                <label shrink>Deposit:</label>
                    <input
                        onChange={props.handleInputFieldChange}
                        type="text"
                        label={depositFormat}
                        id="deposit"
                        className={classes.searchBarStyle}
                        autoFocus
                        variant="outlined"
                    />
            </>
        );
    },
    Price: (props) => {
        const classes = useStyles();
        let priceFormat = <NumberFormat value={props.sale.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        return (
            <>
                <label shrink>Price:</label>
                    <input
                        onChange={props.handleInputFieldChange}
                        id="phone"
                        className={classes.searchBarStyle}
                        type="text"
                        label={priceFormat}
                        autoFocus
                        variant="outlined"
                    />
            </>
        );
    },
    Phone: (props) => {
        const classes = useStyles();
        return (
            <>
                <label shrink>Phone:</label>
                    <input
                        onChange={props.handleInputFieldChange}
                        id="phone"
                        className={classes.searchBarStyle}
                        type="text"
                        label={props.sale.phone}
                        autoFocus
                        variant="outlined"
                    />
            </>
        );
    },
    PurchaseDate: (props) => {
        const classes = useStyles();
        return (
            <>
                <label shrink>{props.sale.purchase_date}:</label>
                    <input
                        onChange={props.handleInputFieldChange}
                        id="purchase_date"
                        className={classes.searchBarStyle}
                        type="date"
                        autoFocus
                        variant="outlined"
                    />
            </>
        );
    },
    PickupDate: (props) => {
        const classes = useStyles();
        return (
            <>
                <label shrink>{props.sale.pickup_date}:</label>
                    <input
                        onChange={props.handleInputFieldChange}
                        id="pickup_date"
                        className={classes.searchBarStyle}
                        type="date"
                        autoFocus
                        variant="outlined"
                    />
            </>
        );
    },
};
export default Input;
