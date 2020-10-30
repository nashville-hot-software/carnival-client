import React, { useState, useEffect } from "react";
import SaleManager from "../../api/dataManager";
import "./detail.css"

const SaleDetails = props => {

  const [sale, setSale] = useState();

  const GetOneSale = () => {
    SaleManager.getOne("sales", props.saleId)
        .then(response => {
            setSale(response)
        })
        
  }

  useEffect(() => {
    GetOneSale();
  }, []);

  return (
    <>
        {sale !== undefined ? (
            <div className="sale-details--container">
                <h2>Sale:</h2>
                <p className="sale-details--Price"><strong>Price:</strong> ${`${sale.price}`}</p>
                <p className="sale-details--Deposit"><strong>Deposit:</strong> ${`${sale.deposit}`}</p>
                <p className="sale-details--PurchaseDate"><strong>Purchase Date:</strong> ${`${sale.purchase_date}`}</p>
                <p className="sale-details--PickupDate"><strong>Pickup Date:</strong> {`${sale.pickup_date}`}</p>
                <p className="sale-details--Invoice"><strong>Invoice:</strong> #{`${sale.invoice_number}`}</p>
                <p className="sale-details--PaymentMethod"><strong>Payment Method:</strong> {`${sale.payment_method}`}</p>
                <p className="sale-details--Returned"><strong>Returned:</strong> {`${sale.returned}`}</p>
            </div>
        ) : null}
    </>
  );
};

export default SaleDetails;