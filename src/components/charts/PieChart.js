import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import API from "../../api/dataManager";

const SalesPieChart = (props) => {
    const [sales, setSales] = useState([]);

    const getAllSales = () => {
        API.getAll("sales", "popular_models", "True").then((response) => {
            console.log(response);
            setSales(sales);
        });
    };
    // const filterSales = () => {
    // const sale = props.sales.filter((st) => st.sale_type_id === 1).length;
    // const lease = props.sales.filter((st) => st.sale_type_id === 2).length; //using a filter and .length
    const data = {
        labels: ["Sale", "Lease"],
        datasets: [
            {
                label: "Sales Data",
                data: [50, 50],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)", //Red
                    "rgba(54, 162, 235, 0.2)", //Blue
                ],
            },
        ],
    };
    // };
    useEffect(() => {
        // filterSales();
        getAllSales();
    }, []);
    return (


        <Doughnut
            data={data}
            width={100}
            height={100}
        options={{ maintainAspectRatio: false }}
        />

    );
};
export default SalesPieChart;
