import React, { useMemo } from 'react';
import "./MonthlyChart.css"
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { BalanceInterface, StateInterface } from '../../interfaces';
import { formatDatesToMonth } from '../../common/utils';
import { ALL_MONTHS, COLOR_GREEN_HEX, COLOR_RED_HEX, MONTHLY_CHART_TICK_INTERVAL } from '../../common/constants';

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
      gridLineWidth: ALL_MONTHS.map((month, index) => (index % 3 === 0 ? 1 : 0)),
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
      tickInterval: MONTHLY_CHART_TICK_INTERVAL,
    },
    series: [
      {
        name: 'Náklady',
        type: 'areaspline',
        data: monthlyCostsSales.costs,
        color: COLOR_RED_HEX,
      },
      {
        name: 'Tržby',
        type: 'areaspline',
        data: monthlyCostsSales.sales,
        color: COLOR_GREEN_HEX,
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