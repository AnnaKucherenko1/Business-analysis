import React, { useEffect } from 'react';
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
      return `${months[month + 1]} ${year}`;
    });

    return formattedDates;
  };

  const config = {
    title: {
      text: 'Monthly Costs and Profit',
    },
    xAxis: {
      categories: formatDate(months),
    },
    yAxis: {
      title: {
        text: 'Amount',
      },
    },
    series: [
      {
        name: 'Costs',
        type: 'areaspline',
        data: costs,
      },
      {
        name: 'Profit',
        type: 'areaspline',
        data: sales,
      },
    ],
  };

  return (
    <div className='container'>
      <HighchartsReact highcharts={Highcharts} options={config} />
    </div>
  )
};

export default MonthlyChart;