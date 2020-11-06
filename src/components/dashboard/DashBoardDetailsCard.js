import React, { useState } from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Modal from "react-bootstrap/Modal";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import NumberFormat from 'react-number-format';


const DashBoardDetailsCard = (props) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
            // borderBottom: '1px solid black',
            "&:hover": {
                // borderBottom: "rgba(255, 125, 4, 0.801)",
                cursor: 'pointer'
            },
        },
    }))(TableRow);

    return (
        <>
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sale</Modal.Title>
                </Modal.Header>
                <StyledTableRow onClick={() => handleShow()} className={props.classes} key={props.row.name}>
                    <StyledTableCell align="center">#{props.row.invoice_number}</StyledTableCell>
                    <StyledTableCell align="center">{props.row.purchase_date}</StyledTableCell>
                    <StyledTableCell align="center">{props.row.vehicle.vehicle_type.make} {props.row.vehicle.vehicle_type.model}</StyledTableCell>
                    <StyledTableCell align="center">{props.row.sales_type.name}</StyledTableCell>
                    <StyledTableCell align="center">
                        <NumberFormat value={props.row.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                    </StyledTableCell>
                </StyledTableRow>
            </Modal>{" "}
        </>
    );
};

export default DashBoardDetailsCard; 