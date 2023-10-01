import React, { useMemo } from 'react';
import "./MonthlyChart.css"
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { BalanceInterface, StateInterface } from '../../interfaces';
import { formatDatesToMonth } from '../../common/utils';
import { allMonths } from '../../common/constants';

const MonthlyChart = () => {
  const balanceData = useSelector((state: StateInterface) => state.data.balance);
  const monthlyCostsSales = useMemo(() => {
    return {
      months: balanceData.map((item: BalanceInterface) => item.month),
      costs: balanceData.map((item: BalanceInterface) => item.costsAmount),
      sales: balanceData.map((item: BalanceInterface) => item.salesAmount),
    }
  }, [balanceData]);

  const config = {
    chart: {
      type: 'areaspline',
    },
    title: {
      text: 'Mesačné tržby a náklady',
      align: 'left',
    },
    xAxis: {
      categories: formatDatesToMonth(monthlyCostsSales.months).map((month, index) => (index % 3 === 0 ? month : '')),
      gridLineWidth: allMonths.map((month, index) => (index % 3 === 0 ? 1 : 0)),
      labels: {
        rotation: 0,
        style: {
          fontSize: '7px',
        },
      },
    },
    yAxis: {
      title: {
        text: null,
      },
      tickInterval: 5000,
    },
    series: [
      {
        name: 'Náklady',
        type: 'areaspline',
        data: monthlyCostsSales.costs,
        color: '#FF4C4C',
      },
      {
        name: 'Tržby',
        type: 'areaspline',
        data: monthlyCostsSales.sales,
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