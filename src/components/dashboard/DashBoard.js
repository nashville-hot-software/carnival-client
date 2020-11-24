import React, { useEffect, useState } from "react";
import DataManager from "../../api/dataManager";
import "./DashBoard.css";
import SaleMetrics from "./saleMetrics"
import Customers from "../customer/list.js";
import Sales from "../sale/table.js";
import Vehicles from "../vehicle/list.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import carnivalImage from "../../images/carnival_cars_image.jpg";
import useStyles from "./muiStyles"
import ModalWrapper from "../modal/modalWrapper"

const DashBoard = (props) => {
  const classes = useStyles();

  const [sales, setSales] = useState([]);
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

  // Ping API for 20 most recent sales, set states for total,
  // purchase, and lease types sales revenues...
  // set states for total, purchase, and lease types sale counts
  const getSales = () => {
    DataManager.getAll("sales").then((response) => {

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

  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicle, setFilteredVehicle] = useState();

  const getVehicles = () => {
    DataManager.getAll("vehicles", "popular_models", "True").then(
      (response) => {
        setVehicles(response);
      }
    );
  };

  const [customers, setCustomers] = useState([]);
  const [filteredCustomer, setFilteredCustomer] = useState();

  const getAllCustomers = () => {
    DataManager.getAll("sales").then(sales => {
      setCustomers(sales);
    });
  };

  const showVehiclesModal = vehicle => {
    const foundVehicle = vehicles.filter(matchedVehicle => matchedVehicle.id === vehicle.id);
    setFilteredVehicle(foundVehicle[0]);

    document.querySelector(".modal-box").classList.add("show");
    document.querySelector(".modal-bg").classList.add("show");
  }
  
  const showCustomersModal = customer => {
    const foundCustomer = customers.filter(matchedCustomer => matchedCustomer.customer_id === customer.customer_id);
    setFilteredCustomer(foundCustomer[0]);

    document.querySelector(".modal-box").classList.add("show");
    document.querySelector(".modal-bg").classList.add("show");
  }
  
  const [filteredSale, setFilteredSale] = useState();

  const showSalesModal = sale => {
    const foundSale = sales.filter(matchedSale => matchedSale.id === sale.id);
    setFilteredSale(foundSale[0]);

    document.querySelector(".modal-box").classList.add("show");
    document.querySelector(".modal-bg").classList.add("show");
  }

  useEffect(() => {
    getSales();
    getVehicles();
    getAllCustomers();
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

      <div className="dashboard--header">Dashboard</div>

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
                  showVehiclesModal={showVehiclesModal}
                  filteredVehicle={filteredVehicle}
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
                  showCustomersModal={showCustomersModal} 
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
                  showSalesModal={showSalesModal}
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
