import React from 'react';
import "./MonthlyChart.css"
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'; // Use 'highcharts-react-official' for Highcharts 9+
import { BalanceInterface, StateInterface } from '../../interfaces';

const MonthlyChart = () => {
  const balanceData = useSelector((state: StateInterface) => state.data.balance);
  const months = balanceData.map((item: BalanceInterface) => item.month);
  const costs = balanceData.map((item: BalanceInterface) => item.costsAmount);
  const sales = balanceData.map((item: BalanceInterface) => item.salesAmount);

  const formatDate = (inputDates: string[]) => {
    const months = [
      "január",
      "február",
      "marec",
      "apríl",
      "máj",
      "jún",
      "júl",
      "august",
      "september",
      "október",
      "november",
      "december",
    ];
    const formattedDates = inputDates.map((inputDate) => {
      const parts = inputDate.split("T")[0].split("-");
      const year = parts[0].slice(-2);
      const month = parseInt(parts[1], 10) - 1;
      return `${months[month]} ${year}`;
    });

    return formattedDates;
  };

  const config = {
    title: {
      text: 'Mesačné tržby a náklady',
      align: 'left',
    },
    xAxis: {
      categories: formatDate(months).map((month, index) => (index % 3 === 0 ? month : '')),
      labels: {
        rotation: 0,
        style: {
          fontSize: '7px',
        },
      }
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    series: [
      {
        name: 'Náklady',
        type: 'areaspline',
        data: costs,
        color: '#FF4C4C',
      },
      {
        name: 'Tržby',
        type: 'areaspline',
        data: sales,
        color: '#29AB87',
      },
    ],
  };

  return (
    <div className='monthly-container' >
      <HighchartsReact highcharts={Highcharts} containerProps={{ className: "monthly-chart" }} options={config} />
    </div >
  )
};

export default MonthlyChart;