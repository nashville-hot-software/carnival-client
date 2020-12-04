import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
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
                <InputLabel shrink>First Name:</InputLabel>
                <FormControl>
                    <TextField
                        onChange={props.handleInputFieldChange}
                        id="first_name"
                        className={classes.searchBarStyle}
                        type="text"
                        label={props.sale.first_name}
                        autoFocus
                        variant="outlined"
                    />
                </FormControl>
            </>
        );
    },

    LastName: (props) => {
        const classes = useStyles();
        return (
            <>
                <InputLabel shrink>Last Name:</InputLabel>
                <FormControl>
                    <TextField
                        onChange={props.handleInputFieldChange}
                        id="last_name"
                        className={classes.searchBarStyle}
                        type="text"
                        label={props.sale.last_name}
                        autoFocus
                        variant="outlined"
                    />
                </FormControl>
            </>
        );
    },
    Email: (props) => {
        const classes = useStyles();
        return (
            <>
                <InputLabel shrink>Email:</InputLabel>
                <FormControl>
                    <TextField
                        onChange={props.handleInputFieldChange}
                        id="email"
                        className={classes.searchBarStyle}
                        type="text"
                        label={props.sale.email}
                        autoFocus
                        variant="outlined"
                    />
                </FormControl>
            </>
        );
    },
    Phone: (props) => {
        const classes = useStyles();
        return (
            <>
                <InputLabel shrink>Phone:</InputLabel>
                <FormControl>
                    <TextField
                        onChange={props.handleInputFieldChange}
                        id="phone"
                        className={classes.searchBarStyle}
                        type="text"
                        label={props.sale.phone}
                        autoFocus
                        variant="outlined"
                    />
                </FormControl>
            </>
        );
    },
    Street: (props) => {
        const classes = useStyles();
        return (
            <>
                <InputLabel shrink>Street:</InputLabel>
                <FormControl>
                    <TextField
                        onChange={props.handleInputFieldChange}
                        id="street"
                        className={classes.searchBarStyle}
                        type="text"
                        label={props.sale.street}
                        autoFocus
                        variant="outlined"
                    />
                </FormControl>
            </>
        );
    },
    City: (props) => {
        const classes = useStyles();
        return (
            <>
                <InputLabel shrink>City:</InputLabel>
                <FormControl>
                    <TextField
                        type="text"
                        label={props.sale.city}
                        id="city"
                        onChange={props.handleInputFieldChange}
                        className={classes.searchBarStyle}
                        autoFocus
                        variant="outlined"
                    />
                </FormControl>
            </>
        );
    },
    ZipCode: (props) => {
        const classes = useStyles();
        return (
            <>
                <InputLabel shrink>Zipcode:</InputLabel>
                <FormControl>
                    <TextField
                        onChange={props.handleInputFieldChange}
                        id="zipcode"
                        className={classes.searchBarStyle}
                        type="text"
                        label={props.sale.zipcode}
                        autoFocus
                        variant="outlined"
                    />
                </FormControl>
            </>
        );
    },
    CompanyName: (props) => {
        const classes = useStyles();
        return (
            <>
                <InputLabel shrink>Company Name:</InputLabel>
                <FormControl>
                    <TextField
                        onChange={props.handleInputFieldChange}
                        id="company_name"
                        className={classes.searchBarStyle}
                        type="text"
                        label={props.sale.company_name}
                        autoFocus
                        variant="outlined"
                    />
                </FormControl>
            </>
        );
    },
    Deposit: (props) => {
        const classes = useStyles();
        let depositFormat = <NumberFormat value={props.sale.deposit} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        return (
            <>

                <InputLabel shrink>Deposit:</InputLabel>
                <FormControl>
                    <TextField
                        onChange={props.handleInputFieldChange}
                        type="text"
                        label={depositFormat}
                        id="deposit"
                        className={classes.searchBarStyle}
                        autoFocus
                        variant="outlined"
                    />
                </FormControl>
            </>
        );
    },
    Price: (props) => {
        const classes = useStyles();
        let priceFormat = <NumberFormat value={props.sale.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        return (
            <>
                <InputLabel shrink>Price:</InputLabel>
                <FormControl>
                    <TextField
                        onChange={props.handleInputFieldChange}
                        id="price"
                        className={classes.searchBarStyle}
                        type="text"
                        label={priceFormat}
                        autoFocus
                        variant="outlined"
                    />
                </FormControl>
            </>
        );
    },
    Phone: (props) => {
        const classes = useStyles();
        return (
            <>
                <InputLabel shrink>Phone:</InputLabel>
                <FormControl>
                    <TextField
                        onChange={props.handleInputFieldChange}
                        id="phone"
                        className={classes.searchBarStyle}
                        type="text"
                        label={props.sale.phone}
                        autoFocus
                        variant="outlined"
                    />
                </FormControl>
            </>
        );
    },
    PurchaseDate: (props) => {
        const classes = useStyles();
        return (
            <>
                <InputLabel shrink>{props.sale.purchase_date}:</InputLabel>
                <FormControl>
                    <TextField
                        onChange={props.handleInputFieldChange}
                        id="purchase_date"
                        className={classes.searchBarStyle}
                        type="date"
                        autoFocus
                        variant="outlined"
                    />
                </FormControl>
            </>
        );
    },
    PickupDate: (props) => {
        const classes = useStyles();
        return (
            <>
                <InputLabel shrink>{props.sale.pickup_date}:</InputLabel>
                <FormControl>
                    <TextField
                        onChange={props.handleInputFieldChange}
                        id="pickup_date"
                        className={classes.searchBarStyle}
                        type="date"
                        autoFocus
                        variant="outlined"
                    />
                </FormControl>
            </>
        );
    },
};
export default Input;
