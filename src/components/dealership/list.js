import React, { useState, useEffect } from "react";
import DealershipCard from "./card";
import DealershipManager from "../../api/dataManager";
import "./list.css"

const Dealerships = props => {

  const [dealerships, setDealerships] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getAllDealerships = () => {
    DealershipManager.getAll("dealerships",20)
      .then(dealerships => {
        setDealerships(dealerships);
    });
  };

  const handleFieldChange = evt => {
    // console.log(evt.target.value)
    setSearchValue(evt.target.value)
  }

  useEffect(() => {
    getAllDealerships();
  }, []);

  return (
    <>
      <div className="dealershipsContainer">
        <div className="dealership--header">Dealerships</div>
        <input type='text' onChange={handleFieldChange} />
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
