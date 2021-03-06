import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import API from "../../api/dataManager";
import "../../styles/charts/pieChart.css"

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

    let data;

    if (props.saleType === "Total") {
        data = {
            labels: ["Purchase Sale %", "Lease Sale %"],
            datasets: [
                {
                    label: "Sales Data",
                    data: [purchaseData, leaseData],
                    datalabels: {
                        formatter: function(value, context) {
                            return value + '%';
                        },
                        color: 'black',
                        font: {
                            weight: 'bold',
                            size: '13'
                        }
                    },
                    backgroundColor: [
                        "rgba(54, 162, 235, 0.8)", //Blue
                        "rgba(255, 99, 132, 0.8)", //Red
                    ]
                }
            ],
        };
    } else if (props.saleType === "Purchase") {
        data = {
            labels: ["Lease Sale %", "Purchase Sale %"],
            datasets: [
                {
                    label: "Sales Data",
                    data: [leaseData, purchaseData],
                    datalabels: {
                        formatter: function(value, context) {
                            return value + '%';
                        },
                        color: 'black',
                        font: {
                            weight: 'bold',
                            size: '13'
                        }
                    },
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.8)", //Red
                        "rgba(54, 162, 235, 0.8)", //Blue
                    ]
                }
            ],
        };
    } else if (props.saleType === "Lease") {
        data = {
            labels: ["Purchase Sale %", "Lease Sale %"],
            datasets: [
                {
                    label: "Sales Data",
                    data: [purchaseData, leaseData],
                    datalabels: {
                        formatter: function(value, context) {
                            return value + '%';
                        },
                        color: 'black',
                        font: {
                            weight: 'bold',
                            size: '13'
                        }
                    },
                    backgroundColor: [
                        "rgba(54, 162, 235, 0.8)", //Blue
                        "rgba(255, 99, 132, 0.8)", //Red
                    ]
                }
            ],
        };
    }

    useEffect(() => {
        getAllSales();
    }, []);
    return (

        <div className="pieChart">
        <Doughnut
            data={data}
            width={245}
            height={245}
            options={{ maintainAspectRatio: false }}
        />
        </div>
    );
};
export default SalesPieChart;
