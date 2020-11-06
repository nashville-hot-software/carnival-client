import React, { useState, useEffect } from "react";
import DealershipManager from "../../api/dataManager";
import "./detail.css"

const DealershipDetails = props => {

  const [dealership, setDealership] = useState();

  const getDealership = () => {
      DealershipManager.getOne("dealerships", props.dealershipId)
        .then(response => {
            setDealership(response)
        })
  }

  useEffect(() => {
    getDealership();
  }, []);

  return (
    <>
        {dealership !== undefined ? (
            <div className="dealership-details--container">
                <h2 className="dealership-details--name">{`${dealership.first_name} ${dealership.last_name}`}</h2>
                <p className="dealership-details--email"><strong>Email:</strong> {dealership.email}</p>
                <p className="dealership-details--phone"><strong>Phone:</strong> {dealership.phone}</p>
            </div>
        ) : null}
    </>
  );
};

export default DealershipDetails;
