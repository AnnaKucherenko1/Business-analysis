import React, { useMemo } from 'react';
import "./MonthlyChart.css"
import { useSelector } from 'react-redux';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { BalanceInterface, StateInterface } from '../../interfaces';
import { formatDatesToMonth } from '../../common/utils';

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
    title: {
      text: 'Mesačné tržby a náklady',
      align: 'left',
    },
    xAxis: {
      categories: formatDatesToMonth(monthlyCostsSales.months).map((month, index) => (index % 3 === 0 ? month : '')),
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