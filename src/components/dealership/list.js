import React, { useState, useEffect } from "react";
import DealershipCard from "./card";
import DealershipManager from "../../api/dataManager";
import "./list.css"


const Dealerships = props => {

  const [dealerships, setDealerships] = useState([]);

  const handleFieldChange = evt => {
    DealershipManager.getAll("dealerships","searchTerm",evt.target.value)
      .then(matchedDealerships => {
        setDealerships(matchedDealerships);
    });
  }

  return (
    <>
      <div className="dealershipsContainer">
        <div className="dealership--header">Dealerships</div>
        <input type='text' onChange={handleFieldChange} />
        
        {dealerships !== undefined ? (
          <div>
          {dealerships.map(dealership => {
            return (
              <DealershipCard
                key={dealership.id}
                dealership={dealership}
                {...props}
              />
            );
          })}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Dealerships;
