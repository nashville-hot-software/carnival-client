import { Route, Redirect } from "react-router-dom";
import SalesPieChart from "../charts/PieChart";
import React, { useEffect, useState } from "react";
import DataManager from "../../api/dataManager";
import "./DashBoard.css";
import Customers from "../customer/list.js";
import Sales from "../sale/table.js";
import Vehicles from "../vehicle/list.js";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NumberFormat from "react-number-format";
import Modal from "react-bootstrap/Modal";
import welcomeImage from "../../images/Welcome1.png";
import DashBoardDetailCard from "../dashboard/DashBoardDetailCard";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    color: "#33475B",
    backgroundColor: "#F5F8FA",
    boxShadow: "2px 2px 4px 1px #cacaca",
  },
  content: {
    // '&:last-child': {
    //   paddingBottom: 0
    // }
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 30,
    fontFamily: "Roboto",
    fontWeight: 500,
    color: "#33475B",
  },
  pos: {
    marginBottom: 12,
  },
  formControl: {
    marginTop: 10,
    minWidth: 120,
    marginLeft: 0,
  },
  selectSaleType: {
    minWidth: "150px",
    "&.MuiInput-underline:after": {
      borderBottom: "1px solid gray",
    },
  },
  selectLabel: {
    color: "gray",
    fontSize: "14px",
    "&.MuiFormLabel-root.Mui-focused": {
      color: "gray",
    },
  },
  arrowIcon: {
    marginRight: "10px",
    marginTop: "240px",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const DashBoard = (props) => {
  const classes = useStyles();

  const [saleCount, setSaleCount] = useState();
  const [totalLeaseCount, setTotalLeaseCount] = useState();
  const [totalPurchaseCount, setTotalPurchaseCount] = useState();

  const [revenue, setRevenue] = useState(0);
  const [leaseRevenue, setLeaseRevenue] = useState(0);
  const [purchaseRevenue, setPurchaseRevenue] = useState(0);
  const [saleType, setSaleType] = useState("Total");

  // State for Modal in the sales metric details
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Handler for sales type select menu
  const handleSaleType = (evt) => {
    setSaleType(evt.target.value);
  };

  // Ping API for 20 most recent sales, set states for total,
  // purchase, and lease types sales revenues...
  // set states for total, purchase, and lease types sale counts
  const getSales = () => {
    DataManager.getAll("sales", "limit", "20").then((response) => {
      console.log(response);

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

  //----------------------------------------------
  // State for Modal in the sales metric details
  //----------------------------------------------
  const [sales, setSales] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const getVehicles = () => {
    DataManager.getAll("vehicles", "popular_models", "True").then(
      (response) => {
        console.log(response);
        setVehicles(response);
      }
    );
  };

  useEffect(() => {
    getSales();
    getVehicles();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard--header">Dashboard</div>

      <div className="dashboard-row--1">
        <div className="saleMetrics--container">
          <Card className={classes.root}>
            <CardContent className={classes.content}>
              <div className="saleMetric--container">
                <div className="saleMetricDetails--container">
                  <h2>Sales Metrics</h2>

                  {saleType === "Total" &&
                    saleCount !== undefined &&
                    revenue !== undefined ? (
                      <>
                        <div className="totalSales--container">
                          <p className="totalSales--label">
                            <strong>Total # of Sales:</strong>
                          </p>
                          <p className="totalSales">{saleCount}</p>
                        </div>
                        <div className="totalRevenue--container">
                          <p className="totalRevenue--label">
                            <strong>Total Sales Revenue:</strong>
                          </p>
                          <NumberFormat
                            className="totalRevenue"
                            value={revenue}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                          />
                        </div>
                      </>
                    ) : null}

                  {saleType === "Lease" && totalLeaseCount !== undefined ? (
                    <>
                      <div className="totalSales--container">
                        <p className="totalSales--label">
                          <strong>Total # of Sales:</strong>
                        </p>
                        <p className="totalSales">{totalLeaseCount}</p>
                      </div>
                      <div className="totalRevenue--container">
                        <p className="totalRevenue--label">
                          <strong>Total Sales Revenue:</strong>
                        </p>
                        <NumberFormat
                          className="totalRevenue"
                          value={leaseRevenue}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                        />
                      </div>
                    </>
                  ) : null}

                  {saleType === "Purchase" &&
                    totalPurchaseCount !== undefined ? (
                      <>
                        <div className="totalSales--container">
                          <p className="totalSales--label">
                            <strong>Total # of Sales:</strong>
                          </p>
                          <p className="totalSales">{totalPurchaseCount}</p>
                        </div>
                        <div className="totalRevenue--container">
                          <p className="totalRevenue--label">
                            <strong>Total Sales Revenue:</strong>
                          </p>
                          <NumberFormat
                            className="totalRevenue"
                            value={purchaseRevenue}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                          />
                        </div>
                      </>
                    ) : null}

                  <FormControl className={classes.formControl}>
                    <InputLabel className={classes.selectLabel}>
                      Sale Types
                    </InputLabel>
                    <Select
                      className={classes.selectSaleType}
                      id="stateId"
                      // value={usaState}
                      onChange={handleSaleType}
                    >
                      <MenuItem value="Total">Total</MenuItem>
                      <MenuItem value="Purchase">Purchase</MenuItem>
                      <MenuItem value="Lease">Lease</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <SalesPieChart saleType={saleType} className="pieChart" />
                <ArrowForwardIcon className={classes.arrowIcon} onClick={() => handleShow()}/>
              </div>
            </CardContent>
          </Card>
        </div>

        <img src={welcomeImage} className="welcomeImg" />
      </div>

      {sales !== undefined ? (
        <Modal centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sale Metric Details </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              {sales.map((item, id) => {
                <DashBoardDetailCard item={item} Key={id} {...props} />;
              })}
            </>
          </Modal.Body>
        </Modal>
      ) : null}

      <div className="dashboard-row--2">
        <div className="dash-vehicles--container">
          <Card className={classes.root}>
            <CardContent>
              <h2>Top Vehicles Sold</h2>
              <Vehicles {...props} />
            </CardContent>
          </Card>
        </div>

        <div className="customers--container">
          <Card className={classes.root}>
            <CardContent>
              <h2>Recent Customers</h2>
              <Customers {...props} />
            </CardContent>
          </Card>
        </div>

        <div className="sales-dashboard--container">
          <Card className={classes.root}>
            <CardContent>
              <h2 className={classes.title}>Recent Sales</h2>
              <Sales {...props} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default DashBoard;
