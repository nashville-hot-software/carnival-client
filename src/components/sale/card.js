import React, {useState} from "react";
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './card.css'


import Modal from 'react-bootstrap/Modal';

const SaleCard = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
      return (
        <>
          <div onClick={() => handleShow()} className="sale-card--container">
          <div className={props.classes.root}>
            <Grid  container wrap="nowrap" container spacing={1}>
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
            </Grid>
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