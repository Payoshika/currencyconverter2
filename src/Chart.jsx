import React from "react"
import {Line} from "react-chartjs-2"
// import Chart from 'chart.js';

const LineExample = (props) => {
  const data = {
    labels: props.labels,
  datasets: [
    {
      label: 'exchange rates for the past month',
      fill: true,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'round',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'square',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#eee',
      pointBorderWidth: 10,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 1,
      pointRadius: 1,
      pointHitRadius: 10,
      data: props.data
    }
  ]
  };

  return (
    <div className="my-3">
      <Line data={data} />
    </div>
  );
}

export default LineExample;
