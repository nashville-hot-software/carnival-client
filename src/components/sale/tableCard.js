import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";
import NumberFormat from 'react-number-format';

const SaleTableCard = (props) => {

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.white ,
      },
      "&:hover": {
          
        cursor: 'pointer',
        opacity: 0.6,
        color: "#000000"
      },  
    },
  }))(TableRow);

  return (
    <>
      <StyledTableRow 
        onClick={() => props.showDetailsModal(props.row, props.sales, props.setFilteredSale)} 
        className={props.classes} 
        key={props.row.name}
      >
        <StyledTableCell align="center">{props.row.purchase_date}</StyledTableCell>
        <StyledTableCell align="center">#{props.row.invoice_number}</StyledTableCell>
        <StyledTableCell align="center">{props.row.vehicle.vehicle_type.make} {props.row.vehicle.vehicle_type.model}</StyledTableCell>
        <StyledTableCell align="center">{props.row.sales_type.name}</StyledTableCell>
        <StyledTableCell align="center">
          <NumberFormat value={props.row.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};

export default SaleTableCard;
