import React from "react";
import "../../styles/sales/card.css"
import "../employee/list.css"
import "../employee/card.css"
import NumberFormat from 'react-number-format';


const SaleDetailModal = props => {

    const handleModalClose = () => {
        document.querySelector(".modal-box").classList.remove("show");
        
        setTimeout(() => {
            document.querySelector(".modal-bg").classList.remove("show");
        }, 300);

        setTimeout(function () {
            props.setFilteredSale();
        }, 700);
    };
  
  return (
    <>
        <div className="modalHeader">
            <div className="employee-details--header">
              <span>Sale</span>
              <span className="employee-id">#{props.sale.id}</span>
            </div>
        </div>

        <div className="modal-details--body">
            <div>
                <strong>Invoice Number:</strong> 
                {`#${props.sale.invoice_number}`}
            </div>
            <div>
                <strong>Dealership:</strong> 
                {`${props.sale.dealership.business_name}`}
            </div>
            <div>
                <strong>Customer:</strong> 
                {`${props.sale.customer.first_name} ${props.sale.customer.last_name}`}
            </div>
            <div>
                <strong>Purchase Date:</strong> 
                {`${props.sale.purchase_date}`}
            </div>
            <div>
                <strong>Pickup Date:</strong> 
                {`${props.sale.pickup_date}`}
            </div>
            <div>
                <strong>Vehicle:</strong> 
                {`${props.sale.vehicle.year_of_car} ${props.sale.vehicle.engine_type} ${props.sale.vehicle.vehicle_type.make} ${props.sale.vehicle.vehicle_type.model}`}
            </div>
            <div>
                <strong>Sales Type:</strong> 
                {`${props.sale.sales_type.name}`}
            </div>
            <div>
                <strong>Deposit:</strong> 
                <NumberFormat value={props.sale.deposit} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </div>
            <div>
                <strong>Price:</strong> 
                <NumberFormat value={props.sale.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            </div>
            <div>
                <strong>Returned:</strong> 
                {props.sale.returned ? 'Yes' : 'No'}
            </div>
        </div>

        <div className="dashSales--btn--container">
            <button className="closeBtn" onClick={handleModalClose}>
                Close  
            </button>
        </div>
    </>
  );
};

export default SaleDetailModal;
