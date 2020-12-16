import React from "react";
import SaleTableCard from "./tableCard.js";
import "../../../styles/sales/sale.css"
import Table from "@material-ui/core/Table";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const SalesTable = (props) => {

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            maxHeight: "252px",
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
            minWidth: 700,
        },
        tableBody: {},
    });
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

    return (
        <>
            <TableContainer className={classes.root} component={Paper}>
                <Table aria-label="customized table">
                    <TableHead classname={classes.tableHeader}>
                        <TableRow>
                            <StyledTableCell align="center">purchase date</StyledTableCell>
                            <StyledTableCell align="center">invoice number</StyledTableCell>
                            <StyledTableCell align="center">vehicle</StyledTableCell>
                            <StyledTableCell align="center">sale type</StyledTableCell>
                            <StyledTableCell align="center">price</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody classname={classes2.tableBody}>
                        {props.sales.map((row) => (
                            <>
                                <SaleTableCard 
                                    key={row.id} 
                                    row={row} 
                                    sales={props.sales}
                                    setFilteredSale={props.setFilteredSale}
                                    showDetailsModal={props.showDetailsModal}
                                    {...props} 
                                />
                            </>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
export default SalesTable


