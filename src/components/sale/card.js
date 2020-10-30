import React from "react";
// import { Link } from "react-router-dom";
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
import './card.css'
const SaleCard = (props) => {
    
      return (
        <div onClick={() => props.history.push(`/sales/${props.item.id}`)} className="sale-card--container">
          <div className="customer-name">{`${props.item.customer.first_name} ${props.item.customer.last_name}`}</div>
          <div className="customer-name">{`$${props.item.price}`}</div>
          <div className="customer-name">{`Purchase Date: ${props.item.purchase_date}`}</div>
        </div>
      );
    
};

export default SaleCard;


























// ----------------- This Code is for the card look at later 10/28/20
// //         <div className={classes.root}>
        
// </div>

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   },
// }));
//   const classes = useStyles();

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