
import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom"
import SaleManager from "../../api/dataManager.js"
import SaleCard from "./card.js"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import './sale.css'

const Sales = props => {

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: 'left',
            color: theme.palette.text.secondary,
        },
    }));
    const classes = useStyles();

    const useStyles2 = makeStyles({
        root: {
            minWidth: 275,
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
            
        },
        pos: {
            marginBottom: 12,
        },
    });

    const classes2 = useStyles2();
    const [sales, setSales] = useState([]);

    const getSales = () => {
        // if((isAuthenticated())){
        // }
        SaleManager.getAll("sales", 20).then((response) => {
            setSales(response);
            console.log(response)
        });
    };


    useEffect(() => {
        getSales();
    }, []);

    return (
        <>
            <Card className={classes.root}>
                <CardContent>
                    <div className="salesContainer">
                        {sales.slice(0, 20).map((item, id) => (
                            <SaleCard key={id} item={item} getSales={getSales} classes={classes} {...props} />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
export default Sales;
