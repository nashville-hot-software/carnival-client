import React, {useState} from "react";
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import './card.css'
import Table from '@material-ui/core/Table';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import Modal from 'react-bootstrap/Modal';

const SaleCard = (props) => {

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
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },

  }))(TableRow);  

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
      return (
        <>
          <div onClick={() => handleShow()} className="sale-card--container">
          <div className={props.classes.root}>
          <TableContainer component={Paper}>
      <Table className={props.classes.table} aria-label="customized table">
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
          {props.item.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
              <StyledTableCell align="right">{row.fat}</StyledTableCell>
              <StyledTableCell align="right">{row.carbs}</StyledTableCell>
              <StyledTableCell align="right">{row.protein}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          </div>
          </div>

          <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>{`${props.item.customer.first_name} ${props.item.customer.last_name}`}</Modal.Body>
          <Modal.Body>{`$${props.item.price}`}</Modal.Body>
          <Modal.Body>{`Purchase Date: ${props.item.purchase_date}`}</Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
          </Modal>
        </>
      )
}

export default SaleCard;





{/* <Grid  container wrap="nowrap" container spacing={1}>
              <Grid item xs={8} sm={6}>
                <Paper className={`sale-card--name ${props.classes.paper}`}>{props.item.invoice_number}{" "}</Paper>
              </Grid>
              <Grid item xs={8} sm={10}>
                <Paper className={`sale-card--name ${props.classes.paper}`}>{`${props.item.purchase_date}`}</Paper>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Paper className={`sale-card--name ${props.classes.paper}`}>Vehicle</Paper>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Paper className={`sale-card--name ${props.classes.paper}`}>{props.item.sales_type.name}</Paper>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Paper className={`sale-card--name ${props.classes.paper}`}>{props.item.price} </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={`sale-card--name ${props.classes.paper}`}></Paper>
              </Grid>
            </Grid> */}


























// ----------------- This Code is for the card look at later 10/28/20

{/* <Grid container spacing={3}>
<Grid item xs={12}>
  <Paper className={classes.paper}>xs=12</Paper>
</Grid>
<Grid item xs={6}>
  <Paper className={classes.paper}>xs=6</Paper>
</Grid>
<Grid item xs={6}>
  <Paper className={classes.paper}>xs=6</Paper>
</Grid>
<Grid item xs={3}>
  <Paper className={classes.paper}>xs=3</Paper>
</Grid>
<Grid item xs={3}>
  <Paper className={classes.paper}>xs=3</Paper>
</Grid>
<Grid item xs={3}>
  <Paper className={classes.paper}>xs=3</Paper>
</Grid>
<Grid item xs={3}>
  <Paper className={classes.paper}>xs=3</Paper>
</Grid>
</Grid> */}