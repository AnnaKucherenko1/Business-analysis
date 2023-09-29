import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { StateInterface } from '../../interfaces';
import './CardDashboard.css'


const Card = ({ data, totalDocs, sum }: any) => {

  const chartOptions = {
    chart: {
      type: 'column',
      className: 'highcharts',
    },
    title: null,
    plotOptions: {
      // column: {
      //   // dataLabels: {
      //   //   enabled: false, 
      //   // },
      //   //   tooltip: {
      //   //     enabled: false, 
      //   // },
      // },
      column: {
        pointPadding: 0,
        borderWidth: 0,
        groupPadding: 0,
        maxPointWidth: 0,
      }
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      visible: false,
    },
    yAxis: {
      visible: false,
    },
    series: [
      {
        name: 'Total',
        data: data.total.map((value: number) => ({
          y: value,
          color: value < 0 ? 'red' : 'green',
        })),
      },
      {
        name: 'Costs',
        data: data.costs,
        color: 'red',
        // pointWidth: 5,
        // pointPadding: 0, 
        // groupPadding: 0,
      },
      {
        name: 'Sales',
        data: data.sales,
        color: 'green',
        // pointWidth: 5,
        // pointPadding: 0, 
        // groupPadding: 0, 
      },
    ],
  };

  return (
    <div className="chartCard">
      <div className="title">
        what
      </div>
      <div className='middle-card'>
        <div className="card-info">
          <p> {sum}</p>
          <p>{totalDocs} dokladov</p>
        </div>
        {/* <div className="chart"> */}
        <HighchartsReact className="highcharts" highcharts={Highcharts} options={chartOptions} />
        {/* </div> */}
      </div>
    </div>
  );
};
export default Card