
import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom"
import SaleManager from "../../api/dataManager.js"
import SaleCard from "./card.js"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import './sale.css'

const Sales = props => {
    
    const useStyles = makeStyles((theme) => ({
        root: {
        flexGrow: 1,
        },
        paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        },
        }));
        const classes = useStyles();

    const [sales, setSales] = useState([]);

    const getSales = () => {
        // if((isAuthenticated())){
        // }
        SaleManager.getAll("sales",20).then((response) => {
            setSales(response);
            console.log(response)
        });
    };


    useEffect(() => {
        getSales();
    }, []);

    return (
        <>
            <Grid item xs={12}>
          <Paper className={classes.paper}></Paper>
        </Grid>
            <div className="salesContainer">
                {sales.slice(0, 20).map((item, id) => (
                    <SaleCard key={id} item={item} getSales={getSales}classes={classes} {...props} />
                ))}
            </div>
        </>
    )
}
export default Sales;
