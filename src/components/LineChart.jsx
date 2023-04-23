import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';


export const LineChart = () => {
    return (
        <div style={{ height: '190px' }}>
            <Line
                data={{
                    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    datasets: [
                        {
                            label: 'Revenue',
                            data: [20, 50, 40, 80, 42, 50, 70],

                        }
                    ],



                }}

                options={{
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            max: 100,
                            min: 0,

                            ticks: {
                                stepSize: 20,
                                callback: function (value, index, ticks) {
                                    return value + 'k';
                                }
                            },

                        },

                    }
                }}
            />
        </div>
    )
}



