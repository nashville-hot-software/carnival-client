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
      // borderBottom: '1px solid black',
      "&:hover": {
        // borderBottom: "rgba(255, 125, 4, 0.801)",
        cursor: 'pointer'
      },
    },
  }))(TableRow);

  return (
    <>
      <StyledTableRow onClick={() => handleShow()} className={props.classes} key={props.row.name}>
        <StyledTableCell align="center">#{props.row.invoice_number}</StyledTableCell>
        <StyledTableCell align="center">{props.row.purchase_date}</StyledTableCell>
        <StyledTableCell align="center">{props.row.vehicle.vehicle_type.make} {props.row.vehicle.vehicle_type.model}</StyledTableCell>
        <StyledTableCell align="center">{props.row.sales_type.name}</StyledTableCell>
        {/* <StyledTableCell align="center">{`$${props.row.price}`}</StyledTableCell> */}
        <StyledTableCell align="center">
          <NumberFormat value={props.row.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        </StyledTableCell>
      </StyledTableRow>

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><strong>Invoice</strong> {""}#{props.row.invoice_number}</Modal.Title>
        </Modal.Header>
        <Modal.Body><strong>Customer Name:{"   "}</strong> {`${props.row.customer.first_name} ${props.row.customer.last_name}`}</Modal.Body>
        <Modal.Body><strong>Dealership:</strong> {`${props.row.dealership.business_name}`}</Modal.Body>
        <Modal.Body><strong>State:</strong> {`${props.row.dealership.state}`}</Modal.Body>
        <Modal.Body><strong>Car Purchased:</strong> {`${props.row.vehicle.vehicle_type.make}`}{  " "} {`${props.row.vehicle.vehicle_type.model}`}</Modal.Body>
        <Modal.Body><strong>Price:</strong>{"   "}<NumberFormat value={props.row.price} displayType={'text'} thousandSeparator={true} prefix={'$'} /> </Modal.Body>
        <Modal.Body><strong>Deposit:</strong>{"   "}<NumberFormat value={props.row.deposit} displayType={'text'} thousandSeparator={true} prefix={'$'} /></Modal.Body>
        <Modal.Body><strong>Payment Method:</strong>{"   "} {`${props.row.payment_method}`}</Modal.Body>
        <Modal.Body><strong>Purchase Date:</strong>{"   "} {`${props.row.purchase_date}`}</Modal.Body>
        <Modal.Body><strong>Pickup Date:</strong> {"   "}{`${props.row.pickup_date}`}</Modal.Body>
      </Modal>{" "}
    </>
  );
};

export default SaleCard;
