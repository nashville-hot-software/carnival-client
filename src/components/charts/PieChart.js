import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import API from "../../api/dataManager";

const SalesPieChart = (props) => {
    const [purchaseData, setPurchaseData] = useState();
    const [leaseData, setLeaseData] = useState();

    const getAllSales = () => {
        
        // Getting all recent sales
        API.getAll("sales", "popular_models", "True").then((response) => {
            
            let saleCount = [];
            let purchaseCount = [];
            let leaseCount = [];

            response.forEach(sale => {
                saleCount.push(sale);

                if (sale.sales_type.name === "Purchase") {
                    purchaseCount.push(sale.sales_type.name)
                } else if (sale.sales_type.name === "Lease") {
                    leaseCount.push(sale.sales_type.name)
                }
            })


            const purchasePercentage = parseInt((purchaseCount.length / saleCount.length) * 100);
            const leasePercentage = parseInt((leaseCount.length / saleCount.length) * 100);

            setPurchaseData(purchasePercentage);
            setLeaseData(leasePercentage);
        });
    };

    const data = {
        labels: ["Purchase %", "Lease %"],
        datasets: [
            {
                label: "Sales Data",
                data: [leaseData, purchaseData],
                datalabels: {
                    formatter: function(value, context) {
                        return value + '%';
                    }
                },
                backgroundColor: [
                    "rgba(255, 99, 132, 0.8)", //Red
                    "rgba(54, 162, 235, 0.8)", //Blue
                ]
            }
        ],
    };
    useEffect(() => {
        getAllSales();
    }, []);
    return (


        <Doughnut
            data={data}
            width={225}
            height={225}
            options={{ maintainAspectRatio: false }}
        />

    );
};
export default SalesPieChart;
