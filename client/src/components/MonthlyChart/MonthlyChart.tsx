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

  const config = {
    title: {
      text: 'Monthly Costs and Profit',
    },
    xAxis: {
      categories: months,
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

  useEffect(() => {
    //TODO: add logic here
  }, [balanceData]);

  return (
    <div className='container'>
      <HighchartsReact highcharts={Highcharts} options={config} />
    </div>
  )
};

export default MonthlyChart;
