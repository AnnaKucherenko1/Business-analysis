import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { StateInterface } from '../../interfaces';
import Card from './Card';
import './CardDashboard.css';
import { formatDate } from '../../formatDate';

const Dashboard = () => {
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
      <Card
        data={bilancia}
        totalDocs={dataRollup.totalDocs}
        sum={(Math.floor(dataRollup.totalSum) / 1000).toFixed(1)}
        title={
          dataRollup.totalSum > 0 ? 'Bilancia (zisk)' : 'Bilancia (strata)'
        }
      />
      <Card
        data={salesData}
        totalDocs={dataRollup.salesTotalDocs}
        sum={Math.floor(dataRollup.salesTotal / 1000)}
        title={'Tržby'}
      />
      <Card
        data={costsData}
        totalDocs={dataRollup.costsTotalDocs}
        sum={Math.floor(dataRollup.costsTotal / 1000)}
        title={'Naklady'}
      />
      <div className='chartCard'>
        <div className='title'>Prehľad DPH</div>
        <div className='middle-card'>
          <div className='tax-table'>
            <table
              className='table-sm table-borderless p-0'
              style={{ fontSize: '12px', borderSpacing: '0' }}
            >
              <thead>
                <tr>
                  <th className='px-4'>Mesiac</th>
                  <th className='px-4'>Suma</th>
                </tr>
              </thead>
              <tbody>
                {dataRollup.lastItems.map((item) => (
                  <tr key={item.month}>
                    <td>{formatDate(item.month)}</td>
                    <td>{(item.salesTax - item.costsTax).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;