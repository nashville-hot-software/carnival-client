import { Route, Redirect } from "react-router-dom"
import SalesPieChart from '../charts/PieChart'
import React, { useEffect, useState } from "react"
import DataManager from '../../api/dataManager'
import "./DashBoard.css"
import Customers from "../customer/list.js"
import Sales from "../sale/list.js"
import Vehicles from "../vehicle/list.js"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NumberFormat from 'react-number-format';
import Modal from 'react-bootstrap/Modal';
import welcomeImage from '../../images/Welcome1.png'

const DashBoard = props => {

  const useStyles2 = makeStyles((theme) => ({
    root: {
      minWidth: 275,
      color: '#33475B',
      backgroundColor: '#F5F8FA',
      boxShadow: '2px 2px 4px 1px #cacaca'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 30,
      fontFamily: 'Roboto',
      fontWeight: 500,
      color: '#33475B'

    },
    pos: {
      marginBottom: 12,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectSaleType: {
      minWidth: '150px',
      '&.MuiInput-underline:after': {
        borderBottom: '1px solid gray'
      }
    },
    selectLabel: {
      color: '#33475B',
      '&.MuiFormLabel-root.Mui-focused': {
        color: 'gray'
      }
    },
    arrowIcon: {
      marginRight: '10px',
      marginTop: '220px',
      '&:hover': {
        cursor: 'pointer'
      }
    }
  }));
  const classes2 = useStyles2();

  const [saleCount, setSaleCount] = useState()
  const [revenue, setRevenue] = useState(0)
   
  const getSales = () => {
    DataManager.getAll("sales", "limit", "20").then(response => {
      console.log(response)

      setSaleCount(response.length);

      let totalRev = 0;
      response.forEach(sale => {
        totalRev += parseFloat(sale.price)
      })
      setRevenue(totalRev)
    })
  };


  useEffect(() => {
    getSales()
  }, [])
// State for Modal in the sales metric details
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="dashboard">

      <div className="dashboard--header">Dashboard</div>

      <div className="dashboard-row--1">
        <div className="vehicles--container">

          <Card className={classes2.root}>
            <CardContent>
              <div className="saleMetric--container">
                <div className="saleMetricDetails--container">

                  <h2>Sales Metrics</h2>

                  {saleCount !== undefined ? (
                    <div className="totalSales--container">
                      <p className="totalSales--label"><strong>Total # of Sales:</strong></p>
                      <p className="totalSales">{saleCount}</p>
                    </div>
                  ) : null}

                  {revenue !== undefined ? (
                    <div className="totalRevenue--container">
                      <p className="totalRevenue--label"><strong>Total Sales Revenue:</strong></p>
                      <NumberFormat className="totalRevenue" value={revenue} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                    </div>
                  ) : null}

                  <FormControl className={classes2.formControl}>
                    <InputLabel className={classes2.selectLabel}>
                      Sale Types
                    </InputLabel>
                    <Select
                      className={classes2.selectSaleType}
                      // displayEmpty
                      labelId="unitedStateId"
                      id="stateId"
                      // value={usaState}
                      // onChange={handleStatePick}
                    >
                      <MenuItem value="" >
                        Total
                      </MenuItem>
                      <MenuItem value="" >
                        Purchase
                      </MenuItem>
                      <MenuItem value="" >
                        Lease
                      </MenuItem>
                      {/* {usaStateList.map((item, i) => (

                          <MenuItem key={i} id={"stateId"} value={item.id}>
                              {item.name}
                          </MenuItem> */}

                      {/* ))} */}
                    </Select>
                  </FormControl>
                </div>
                <SalesPieChart className="pieChart" />
                <ArrowForwardIcon className={classes2.arrowIcon} onclick/>
              </div>
            </CardContent>
          </Card>
        </div>

        <img src={welcomeImage} className="welcomeImg" />
      </div>

      {/* <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sale</Modal.Title>
        </Modal.Header>
        <Modal.Body><strong>Invoice:</strong> {`#${props.row.invoice_number}`}</Modal.Body>
        <Modal.Body><strong>Customer:</strong> {`${props.row.customer.first_name} ${props.row.customer.last_name}`}</Modal.Body>
        <Modal.Body><strong>Dealership:</strong> {`${props.row.dealership.business_name}`}</Modal.Body>
        <Modal.Body><strong>State:</strong> {`${props.row.dealership.state}`}</Modal.Body>
      </Modal> */}

      <div className="dashboard-row--2">
        <div className="vehicles--container">
          <Card className={classes2.root}>
            <CardContent>
              <h2>Top Vehicles</h2>
              <Vehicles {...props} />
            </CardContent>
          </Card>
        </div>
        <div className="customers--container">
          <Card className={classes2.root}>
            <CardContent>
              <h2>Recent Customers</h2>
              <Customers {...props} />
            </CardContent>
          </Card>
        </div>
        <div className="sales--container">
          <Card className={classes2.root}>
            <CardContent>
              <h2 className={classes2.title}>Recent Sales</h2>
              <Sales {...props} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
export default DashBoard;