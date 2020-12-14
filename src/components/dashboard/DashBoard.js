import React, { useEffect, useState } from "react";
import DataManager from "../../api/dataManager";
import "../../styles/dashboard/dashboard.css"
import SaleMetrics from "./saleMetrics"
import Customers from "../customer/list.js";
import Sales from "../sale/table.js";
import Vehicles from "../vehicle/dashList.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import carnivalImage from "../../images/carnival_cars_image.jpg";
import useStyles from "./muiStyles"
import ModalWrapper from "../modal/modalWrapper"
import { modal } from "../../modules/modal/helpers"

const DashBoard = (props) => {
  const classes = useStyles();

  // for the card lists and card details
  const [sales, setSales] = useState([]);
  const [filteredSale, setFilteredSale] = useState();
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicle, setFilteredVehicle] = useState();
  const [customers, setCustomers] = useState([]);
  const [filteredCustomer, setFilteredCustomer] = useState();

  // for sale metrics section
  const [saleCount, setSaleCount] = useState();
  const [totalLeaseCount, setTotalLeaseCount] = useState();
  const [totalPurchaseCount, setTotalPurchaseCount] = useState();
  const [revenue, setRevenue] = useState(0);
  const [leaseRevenue, setLeaseRevenue] = useState(0);
  const [purchaseRevenue, setPurchaseRevenue] = useState(0);
  const [saleType, setSaleType] = useState("Total");

  // Handler for sales type select menu
  const handleSaleType = (evt) => {
    setSaleType(evt.target.value);
  };

  // Ping API for 20 most recent sales, set states for total sales,
  // purchase sales, and lease sales (both revenues and sale counts)
  const getSales = () => {
    DataManager.getAll("sales")
      .then((response) => {
        setSales(response);
        setSaleCount(response.length);

        let totalLeaseRev = 0;
        let totalPurchaseRev = 0;
        let leaseCounter = 0;
        let purchaseCounter = 0;

        response.forEach((sale) => {
          if (sale.sales_type.name === "Lease") {
            leaseCounter += 1;
            totalLeaseRev += parseFloat(sale.price);
          } else if (sale.sales_type.name === "Purchase") {
            purchaseCounter += 1;
            totalPurchaseRev += parseFloat(sale.price);
          }
        });

        setTotalLeaseCount(leaseCounter);
        setTotalPurchaseCount(purchaseCounter);
        setLeaseRevenue(totalLeaseRev.toFixed(2));
        setPurchaseRevenue(totalPurchaseRev.toFixed(2));

        let totalRev = 0;
        response.forEach((sale) => {
          totalRev += parseFloat(sale.price);
        });
        setRevenue(totalRev.toFixed(2));
    });
  };

  const getData = (setStateArray, endpoint, queryParam, value) => {
    if (queryParam && value) {
      DataManager.getAll(endpoint, queryParam, value)
        .then(
          (response) => {
            setStateArray(response);
          }
      );
    } else {
      DataManager.getAll(endpoint)
          .then(
            (response) => {
              setStateArray(response);
            }
        );
    }
  };

  const showDetailsModal = (item, stateArray, setFilteredState) => {
    const foundItem = stateArray.filter(matchedItem => matchedItem.id === item.id);
    setFilteredState(foundItem[0]);

    modal.handleDetailsShow();
  }  

  useEffect(() => {
    getSales();
    getData(setVehicles, "vehicles", "popular_models", "True");
    getData(setCustomers, "sales");
  }, []);

  return (
    <>
    <ModalWrapper 
      filteredVehicle={filteredVehicle}
      setFilteredVehicle={setFilteredVehicle}
      filteredCustomer={filteredCustomer}
      setFilteredCustomer={setFilteredCustomer}
      filteredSale={filteredSale}
      setFilteredSale={setFilteredSale}
    />

    <div className="dashboard">
      <div className="dashboard--header">
        Dashboard
      </div>
      <div className="dashboard-row--1">
        <SaleMetrics
          classes={classes}
          saleCount={saleCount}
          saleType={saleType}
          totalLeaseCount={totalLeaseCount}
          totalPurchaseCount={totalPurchaseCount}
          revenue={revenue}
          leaseRevenue={leaseRevenue}
          purchaseRevenue={purchaseRevenue}
          handleSaleType={handleSaleType}
        />

        <div className="welcomeImg--container">
          <div className="carnival-dashboard--header">Carnival Cars</div>
          <img src={carnivalImage} className="welcomeImg" />
        </div>
      </div>

      <div className="dashboard-row--2">
        <div className="dash-vehicles--container">
          <Card className={classes.root}>
            <CardContent>
              <h2>Top Vehicles Sold</h2>

              {vehicles !== undefined ? (
                <Vehicles 
                  vehicles={vehicles} 
                  showDetailsModal={showDetailsModal}
                  filteredVehicle={filteredVehicle}
                  setFilteredVehicle={setFilteredVehicle}
                  {...props} 
                />
              ) : null}
            </CardContent>
          </Card>
        </div>

        <div className="customers--container">
          <Card className={classes.root}>
            <CardContent>
              <h2>Recent Customers</h2>

              {customers !== undefined ? (
                <Customers 
                  customers={customers}
                  showDetailsModal={showDetailsModal}
                  setFilteredCustomer={setFilteredCustomer}
                  {...props} 
                />
              ) : null}
            </CardContent>
          </Card>
        </div>

        <div className="sales-dashboard--container">
          <Card className={classes.root}>
            <CardContent>
              <h2 className={classes.title}>Recent Sales</h2>
              
              {sales !== undefined ? (
                <Sales 
                  sales={sales}
                  showDetailsModal={showDetailsModal}
                  setFilteredSale={setFilteredSale}
                  {...props} 
                />
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
};
export default DashBoard;
