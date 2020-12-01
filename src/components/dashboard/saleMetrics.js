import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import NumberFormat from "react-number-format";
import SalesPieChart from "../charts/PieChart";

const SaleMetrics = props => {
    return (
        <div className="saleMetrics--container">
            <Card className={props.classes.root}>
            <CardContent className={props.classes.content}>
            <div className="saleMetric--container">
                <div className="saleMetricDetails--container">
                    <h2>Monthly Sales Metrics</h2>

                    {props.saleType === "Total" && props.saleCount !== undefined 
                    && props.revenue !== undefined ? (
                        <>
                        <div className="totalSales--container">
                            <p className="totalSales--label">
                            <strong>Total # of Sales:</strong>
                            </p>
                            <p className="totalSales">{props.saleCount}</p>
                        </div>
                        <div className="totalRevenue--container">
                            <p className="totalRevenue--label">
                            <strong>Total Sales Revenue:</strong>
                            </p>
                            <NumberFormat
                            className="totalRevenue"
                            value={props.revenue}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                            />
                        </div>
                        </>
                    ) : null}

                    {props.saleType === "Lease" && props.totalLeaseCount !== undefined ? (
                    <>
                        <div className="totalSales--container">
                        <p className="totalSales--label">
                            <strong>Total # of Sales:</strong>
                        </p>
                        <p className="totalSales">{props.totalLeaseCount}</p>
                        </div>
                        <div className="totalRevenue--container">
                        <p className="totalRevenue--label">
                            <strong>Total Sales Revenue:</strong>
                        </p>
                        <NumberFormat
                            className="totalRevenue"
                            value={props.leaseRevenue}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                        />
                        </div>
                    </>
                    ) : null}

                    {props.saleType === "Purchase" &&
                    props.totalPurchaseCount !== undefined ? (
                        <>
                        <div className="totalSales--container">
                            <p className="totalSales--label">
                            <strong>Total # of Sales:</strong>
                            </p>
                            <p className="totalSales">{props.totalPurchaseCount}</p>
                        </div>
                        <div className="totalRevenue--container">
                            <p className="totalRevenue--label">
                            <strong>Total Sales Revenue:</strong>
                            </p>
                            <NumberFormat
                            className="totalRevenue"
                            value={props.purchaseRevenue}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                            />
                        </div>
                        </>
                    ) : null}
                    <div className="selectMenu">
                    <FormControl className={props.classes.formControl}>
                    <InputLabel className={props.classes.selectLabel}>
                        Sale Types
                    </InputLabel>
                    <Select
                        className={props.classes.selectSaleType}
                        id="stateId"
                        value={props.saleType}
                        onChange={props.handleSaleType}
                    >
                        <MenuItem value="Total">Total</MenuItem>
                        <MenuItem value="Purchase">Purchase</MenuItem>
                        <MenuItem value="Lease">Lease</MenuItem>
                    </Select>
                    </FormControl>
                    </div>
                </div>

                <SalesPieChart saleType={props.saleType} className="pieChart" />
            </div>
            </CardContent>
            </Card>
        </div>
    );
}

export default SaleMetrics;