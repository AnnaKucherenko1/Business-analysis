import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { StateInterface } from '../../interfaces';
import './ChartPies.css'

const ChartPies = () => {
  const costsData = useSelector((state: StateInterface) => state.data.costsGrouped);
  const salesData = useSelector((state: StateInterface) => state.data.salesGrouped);

  const salesOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Tržby',
      align: 'left',
    },
    series: [
      {
        name: 'Category',
        data: Object.entries(salesData).map(([category, value]) => ({
          name: category,
          y: value,
        })),
        colorByPoint: true,
        showInLegend: true,
      },
    ],
    legend: {
      enabled: true,
      layout: 'vertical',
      align: 'left',
      maxHeight: 200
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: false,
        },
      },
    },
  };

  const costsOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Náklady',
      align: 'left',
    },
    series: [
      {
        name: 'Category',
        data: Object.entries(costsData).map(([category, value]) => ({
          name: category,
          y: value,
        })),
        colorByPoint: true,
        showInLegend: true,
      },
    ],
    legend: {
      enabled: true,
      layout: 'vertical',
      align: 'left',
      maxHeight: 200
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: false,
        },
      },
    },
  };
  return (
    <div className="pie-charts">
      <div className="pie-chart">
        <HighchartsReact highcharts={Highcharts} options={salesOptions} containerProps={{ className: "pie" }} />
      </div>
      <div className="pie-chart">
        <HighchartsReact highcharts={Highcharts} options={costsOptions} containerProps={{ className: "pie" }} />
      </div>
    </div>
  );
};

export default ChartPies;