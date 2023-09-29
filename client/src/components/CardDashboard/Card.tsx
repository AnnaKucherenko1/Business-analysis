import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { StateInterface } from '../../interfaces';
import './CardDashboard.css'


const Card = ({ data, totalDocs, sum, title }: any) => {

  const chartOptions = {
    chart: {
      type: 'column',
      className: 'highcharts',
    },
    title: null,
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 0,
        groupPadding: 0,
        pointWidth: 3,
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
      },
      {
        name: 'Sales',
        data: data.sales,
        color: 'green',
      },
    ],
  };

  return (
    <div className="chartCard">
      <div className="title">
        {title}
      </div>
      <div className='middle-card'>
        <div className="card-info">
          <p> {sum}K</p>
          <p>{totalDocs} dokladov</p>
        </div>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    </div>
  );
};
export default Card