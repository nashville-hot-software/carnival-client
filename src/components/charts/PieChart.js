import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';



export default class ActionPieChart extends Component {
    render() {
        // const Submitted =  this.props.records.filter(r => r.patientActionId === 2).length
        // const Resisted =  this.props.records.filter(r => r.patientActionId === 1).length
        // const Undo =  this.props.records.filter(r => r.patientActionId === 3).length
        //                                               //using a filter and .length
        // const data = {
        //     labels: ["Submitted", "Resisted", "Undo",],
        //     datasets: [
        //         {
        //             label: "Compulsion Data",
        //             data: [Submitted, Resisted, Undo],
        //             backgroundColor: [
        //                 'rgba(255, 99, 132, 0.2)', //Red
        //                 'rgba(54, 162, 235, 0.2)', //Blue
        //                 'rgba(255, 206, 86, 0.2)', //Yellow
        //             ],
        //         }
        //     ]
        // }
        return (
            <div >
                <Doughnut
                    // data={data}
                    width={300}
                    height={300}
                   //options={{ maintainAspectRatio: false }}
                />
            </div>
        )
    }
}