import React, { useState } from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Modal from "react-bootstrap/Modal";
import { makeStyles, withStyles } from "@material-ui/core/styles";
const SaleCard = (props) => {
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
    },
}))(TableRow);
  return (
    <>
      <StyledTableRow onClick={() => handleShow()} key={props.row.name}>
        <StyledTableCell align="center">{props.row.invoice_number}</StyledTableCell>
        <StyledTableCell align="center">{props.row.purchase_date}</StyledTableCell>
        <StyledTableCell align="center">{props.row.vehicle.vehicle_type.make} {props.row.vehicle.vehicle_type.model}</StyledTableCell>
        <StyledTableCell align="center">{props.row.sales_type.name}</StyledTableCell>
        <StyledTableCell align="center">{`$${props.row.price}`}</StyledTableCell>
      </StyledTableRow>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sale</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`${props.row.customer.first_name} ${props.row.customer.last_name}`}</Modal.Body>
        <Modal.Body>{`$${props.row.price}`}</Modal.Body>
        <Modal.Body>{`Purchase Date: ${props.row.purchase_date}`}</Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>{" "}
    </>
  );
};

export default SaleCard;
