import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Card from 'react-bootstrap/Card';
import './CardDashboard.css';

interface CardComponentProps {
  data: {
    months: string[];
    sales?: number[];
    costs?: number[];
    total: number[];
  };
  totalDocs: number;
  sum: string | number;
  title: string;
  className: string;
}

const CardComponent = ({
  data,
  totalDocs,
  sum,
  title,
  className,
}: CardComponentProps) => {
  const chartOptions = {
    chart: {
      type: 'column',
    },
    title: null,
    plotOptions: {
      column: {
        pointPadding: 0,
        borderWidth: 0,
        groupPadding: 0,
        pointWidth: 3,
      },
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
          color: value < 0 ? '#FF4C4C' : '#29ab87',
        })),
      },
      {
        name: 'Costs',
        data: data.costs,
        color: '#FF4C4C',
      },
      {
        name: 'Sales',
        data: data.sales,
        color: '#29ab87',
      },
    ],
  };

  return (
    <Card style={{ width: '22.5%', height: '100%' }}>
      <Card.Body>
        <Card.Title className='ml-0'> {title} </Card.Title>
        <Card.Text>
          <div className='middle-card'>
            <div className='card-info'>
              <p className={className}> {sum}K</p>
              <p className='docs'>{totalDocs} dokladov</p>
            </div>
            <HighchartsReact
              highcharts={Highcharts}
              containerProps={{ className: 'highcharts' }}
              options={chartOptions}
            />
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default CardComponent;
