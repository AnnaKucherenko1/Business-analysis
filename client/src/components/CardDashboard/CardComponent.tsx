import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Card from 'react-bootstrap/Card';
import './CardDashboard.css';
import { Container } from 'react-bootstrap';
import { COLOR_GREEN_HEX, COLOR_RED_HEX } from '../../common/constants';

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
          color: value < 0 ? COLOR_GREEN_HEX : COLOR_RED_HEX,
        })),
      },
      {
        name: 'Costs',
        data: data.costs,
        color: COLOR_GREEN_HEX,
      },
      {
        name: 'Sales',
        data: data.sales,
        color: COLOR_RED_HEX,
      },
    ],
  };

  return (
    <Card className='card-wrap'>
      <Card.Body>
        <Card.Title className='title-left'> {title} </Card.Title>
        <Container>
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
        </Container>
      </Card.Body>
    </Card>
  );
};
export default CardComponent;
