import React, { useState, useEffect } from "react";
import DealershipCard from "./card";
import DealershipManager from "../../api/dataManager";
import "./list.css"

const Dealerships = props => {

  const [dealerships, setDealerships] = useState([]);

  const getAllDealerships = () => {
    DealershipManager.getAll("dealerships",20)
      .then(dealerships => {
        setDealerships(dealerships);
    });
  };

  useEffect(() => {
    getAllDealerships();
  }, []);

  return (
    <>
      <div className="dealershipsContainer">
        {dealerships.slice(0,20).map(dealership => {
          return (
            <DealershipCard
              key={dealership.id}
              dealership={dealership}
              getAllDealerships={getAllDealerships}
              {...props}
            />
          );
        })}
      </div>
    </>
  );
};

export default Dealerships;
