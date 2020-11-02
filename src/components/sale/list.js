import React, { useState, useEffect } from "react";
import SaleManager from "../../api/dataManager.js";
import SaleCard from "./card.js";
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
            maxHeight: "250px",
            backgroundColor: "#F5F8FA",
            overflow: "auto",
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: "left",
            color: theme.palette.text.secondary,
        },
        tableHeader: {
            position: "fixed",
        },
    }));

    const classes = useStyles();

    const useStyles2 = makeStyles({
        table: {
            minWidth: 800,
        },
        tableBody: {},
    });
    const classes3 = useStyles2();


    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);

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
            {/* <div className="salesContainer"> */}

            <TableContainer className={classes.root} component={Paper}>
                <Table stickyHeader aria-label="customized table">
                    <TableHead classname={classes.tableHeader}>
                        <TableRow>
                            <StyledTableCell align="left">invoice number</StyledTableCell>
                            <StyledTableCell align="center">purchase date</StyledTableCell>
                            <StyledTableCell align="center">vehicle</StyledTableCell>
                            <StyledTableCell align="center">sale type</StyledTableCell>
                            <StyledTableCell align="center">price</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className={classes3.tableBody}>
                        {sales.map((row) => (
                            <>
                                <SaleCard row={row} {...props} />

                            </>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>

            {/* </div> */}
        </>
    );
};
export default Sales


