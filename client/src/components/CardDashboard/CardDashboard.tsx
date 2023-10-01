import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { StateInterface } from '../../interfaces';
import './CardDashboard.css';
import { formatDate } from '../../formatDate';
import CardComponent from './CardComponent';
import { Card } from 'react-bootstrap';

const CardDashboard = () => {
  const data = useSelector((state: StateInterface) => state.data);
  const dataRollup = useMemo(() => {
    return {
      costsTotalDocs: data.costsTotalDocs,
      salesTotalDocs: data.salesTotalDocs,
      totalDocs: data.costsTotalDocs + data.salesTotalDocs,
      costsTotal: data.costsTotal,
      salesTotal: data.salesTotal,
      totalSum: data.salesTotal - data.costsTotal,
      months: data.balance.map((item: { month: string }) => item.month),
      costs: data.balance.map((item: { costsAmount: number }) => item.costsAmount),
      sales: data.balance.map((item: { salesAmount: number }) => item.salesAmount),
      lastItems: data.balance.slice(-3),
    };
  }, [data]);

  const costsData = {
    months: dataRollup.months,
    costs: dataRollup.costs,
    total: [],
  };

  const salesData = {
    months: dataRollup.months,
    sales: dataRollup.sales,
    total: [],
  };
  const bilancia = {
    months: dataRollup.months,
    total: dataRollup.sales.map(
      (sale, index) => sale - dataRollup.costs[index]
    ),
  };

  return (
    <div className='dashboard'>
      <CardComponent
        data={bilancia}
        totalDocs={dataRollup.totalDocs}
        sum={(Math.floor(dataRollup.totalSum) / 1000).toFixed(1)}
        className={dataRollup.totalSum > 0 ? 'trzby' : 'naklady'}
        title={
          dataRollup.totalSum > 0 ? 'Bilancia (zisk)' : 'Bilancia (strata)'
        }
      />
      <CardComponent
        data={salesData}
        totalDocs={dataRollup.salesTotalDocs}
        sum={Math.floor(dataRollup.salesTotal / 1000)}
        title={'Tržby'}
        className={'trzby'}
      />
      <CardComponent
        data={costsData}
        totalDocs={dataRollup.costsTotalDocs}
        sum={Math.floor(dataRollup.costsTotal / 1000)}
        title={'Náklady'}
        className={'naklady'}
      />
      <Card style={{ width: '22.5%', height: '100%' }}>
        <Card.Body>
          <Card.Title>  Prehľad DPH </Card.Title>
          <Card.Text>
            <div className='tax-table'>
              <table
                className='table-card'
                style={{ fontSize: '12px', borderSpacing: '0' }}
              >
                <thead>
                  <tr>
                    <th>Mesiac</th>
                    <th>Suma</th>
                  </tr>
                </thead>
                <tbody>
                  {dataRollup.lastItems.map((item) => (
                    <tr key={item.month} className='tr-row-card'>
                      <td>{formatDate(item.month)}</td>
                      <td className='taxes'>{(item.salesTax - item.costsTax).toFixed(2)}€</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardDashboard;