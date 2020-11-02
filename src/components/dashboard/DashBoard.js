import React, { useState } from "react"
import { Route, Redirect } from "react-router-dom"
import ActionPieChart from '../charts/PieChart'
import "./DashBoard.css"
import Customers from "../customer/list.js"
import Sales from "../sale/list.js"
import Vehicles from "../vehicle/list.js"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
const DashBoard = props => {

  const useStyles2 = makeStyles({
    root: {
        minWidth: 275,
        color:'#33475B',
        backgroundColor: '#F5F8FA',
        boxShadow: '1px 4px 6px 0 grey'
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

  return (
    <>
      {/* <ActionPieChart/> */}

      <div className={`dashboard-row--1 ${classes2.root}`}>
        hello
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