import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import API from "../../api/dataManager";

const SalesPieChart = (props) => {
    const [sales, setSales] = useState([]);
    const [purchaseData, setPurchaseData] = useState();
    const [leaseData, setLeaseData] = useState();

    const getAllSales = () => {
        API.getAll("sales", "popular_models", "True").then((response) => {
            setSales(sales);
            
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

            console.log(saleCount.length)
            console.log(purchaseCount.length)
            console.log(leaseCount.length)

            const purchasePercentage = parseFloat((purchaseCount.length / saleCount.length) * 100).toFixed(2);
            const leasePercentage = parseFloat((leaseCount.length / saleCount.length) * 100).toFixed(2);

            setPurchaseData(purchasePercentage);
            setLeaseData(leasePercentage);
            
            console.log(`purchasePercentage: ${purchasePercentage}%, leasePercentage: ${leasePercentage}%`);

            
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
                data: [leaseData, purchaseData],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.8)", //Red
                    "rgba(54, 162, 235, 0.8)", //Blue
                ],
                datalabels: {
                    labels: {
                        title: 'test'
                    }
                }
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
            width={250}
            height={250}
            options={{ maintainAspectRatio: false }}
        />

    );
};
export default SalesPieChart;
