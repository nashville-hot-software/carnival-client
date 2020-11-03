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

const DashBoard = props => {

  const useStyles2 = makeStyles({
    root: {
        minWidth: 275,
        color:'#33475B',
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
  });
  const classes2 = useStyles2();

  const [saleCount, setSaleCount] = useState()
  const [revenue, setRevenue] = useState(0)

  const getSales = () => {
    DataManager.getAll("sales","sale_count","True").then(response => {
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

  return (
    <>

      <div className="dashboard-row--1">
        <div className="vehicles--container">
          <Card className={classes2.root}>
            <CardContent>
              <h2>Sales Metrics</h2>

              {saleCount !== undefined ? (
                <div className="totalSales--container">
                  <p className="totalSales--label"><strong>Total Sales:</strong></p>
                  <p className="totalSales">{saleCount}</p>
                </div>
              ) : null}

              {revenue !== undefined ? (
                <div className="totalRevenue--container">
                  <p className="totalRevenue--label"><strong>Total Revenue:</strong></p>
                  <p className="totalRevenue">${revenue}</p>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="dashboard-row--2">
        <div className="vehicles--container">
          <Card className={classes2.root}>
            <CardContent>
              <h2>Vehicles</h2>
              <Vehicles {...props} />
            </CardContent>
          </Card>
        </div>
        <div className="customers--container">
          <Card className={classes2.root}>
            <CardContent>
              <h2>Customers</h2>
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
    </>
  )
}
export default DashBoard;