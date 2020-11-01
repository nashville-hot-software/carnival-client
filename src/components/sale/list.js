import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import SaleManager from "../../api/dataManager.js";
import SaleCard from "./card.js";
import Card from "@material-ui/core/Card";
// import Grid from '@material-ui/core/Grid';
import CardContent from "@material-ui/core/CardContent";
import "./sale.css";
import Table from "@material-ui/core/Table";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const Sales = (props) => {
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            maxHeight: '250px',
            backgroundColor: '#F5F8FA'
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: "left",
            color: theme.palette.text.secondary,
        },
    }));
    const classes = useStyles();
    //---------------------------------- useStyles2 styles the sales card on the dashboard
    const useStyles2 = makeStyles({
        root: {
            minWidth: 275,
        },
        bullet: {
            display: "inline-block",
            margin: "0 2px",
            transform: "scale(0.8)",
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
    });
    //---------------------------------- useStyles2 styles the sales card on the dashboard

    const useStyles3 = makeStyles({
        table: {
            minWidth: 700,
        },
    });
    const classes3 = useStyles3();

    const classes2 = useStyles2();

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

    const StyledTableRow = withStyles((theme) => ({
        root: {
            "&:nth-of-type(odd)": {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

    // State variable that handles storing the list of sales
    const [sales, setSales] = useState([]);

    // Function that calls the (SalesManager) datamanager to fetch sales data from the database
    const getSales = () => {
        SaleManager.getAll("sales", "limit", 20).then((response) => {
            setSales(response);
            console.log(response);
        });
    };

    useEffect(() => {
        getSales();
    }, []);

    return (
        <>
            <div className="salesContainer">
         <TableContainer component={Paper}>
                        <Table
                            className={classes.table}
                            aria-label="customized table"
                        >
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>#invoice number</StyledTableCell>
                                    <StyledTableCell align="right">purchase_date</StyledTableCell>
                                    <StyledTableCell align="right">vehicle</StyledTableCell>
                                    <StyledTableCell align="right">sale_type</StyledTableCell>
                                    <StyledTableCell align="right">$sale_price</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sales.map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">
                                            {row.calories}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.fat}</StyledTableCell>
                                        <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            {row.protein}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
          
                   
                        {sales.slice(0, 20).map((item, id) => (
                            <SaleCard
                                key={id}
                                item={item}
                                getSales={getSales}
                                classes={classes}
                                {...props}
                            />
                        ))}
                    </div>
        </>
    );
};
export default Sales;
