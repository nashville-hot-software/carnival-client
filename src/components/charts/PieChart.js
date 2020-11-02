// import React, { Component } from 'react';
// import { Doughnut } from 'react-chartjs-2';



// const SalesPieChart() => {
//     render() {
//         const sale =  this.props.sales.filter(st => st.sale_type_id === 1).length
//         const lease =  this.props.records.filter(st => st.sale_type_id === 2).length                                                      //using a filter and .length
//         const data = {
//             labels: ["Submitted", "Resisted", "Undo",],
//             datasets: [
//                 {
//                     label: "Compulsion Data",
//                     data: [Submitted, Resisted, Undo],
//                     backgroundColor: [
//                         'rgba(255, 99, 132, 0.2)', //Red
//                         'rgba(54, 162, 235, 0.2)', //Blue
//                         'rgba(255, 206, 86, 0.2)', //Yellow
//                     ],
//                 }
//             ]
//         }
//         return (
//             <div >
//                 <Doughnut
//                     data={data}
//                     width={300}
//                     height={300}
//                    //options={{ maintainAspectRatio: false }}
//                 />
//             </div>
//         )
//     }
// }
// export default SalesPieChart
