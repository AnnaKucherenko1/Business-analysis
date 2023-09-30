import React from 'react';
import { useSelector } from 'react-redux';
import { StateInterface } from '../../interfaces';
import Card from './Card';
import './CardDashboard.css'
import { formatDate } from '../../formatDate';

const Dashboard = () => {
  const data = useSelector((state: StateInterface) => state.data);
  const costsTotalDocs = data.costsTotalDocs;
  const salesTotalDocs = data.salesTotalDocs;
  const totalDocs = costsTotalDocs + salesTotalDocs
  const costsTotal = data.costsTotal;
  const salesTotal = data.salesTotal;
  const totalSum = salesTotal - costsTotal
  const months = data.balance.map((item: { month: any; }) => item.month);
  const costs = data.balance.map((item: { costsAmount: any; }) => item.costsAmount);
  const sales = data.balance.map((item: { salesAmount: any; }) => item.salesAmount);
  const lastItems = data.balance.slice(-3);


  const costsData = {
    months: months,
    costs: costs,
    total: [],
  };

  const salesData = {
    months: months,
    sales: sales,
    total: [],
  };
  const bilancia = {
    months: months,
    total: sales.map((sale, index) => sale - costs[index]),
  };
  console.log(bilancia)

  return (
    <div className="dashboard">
      <Card data={bilancia} totalDocs={totalDocs} sum={(Math.floor(totalSum) / 1000).toFixed(1)} title={totalSum > 0 ? 'Bilancia (zisk)' : 'Bilancia (strata)'} />
      <Card data={salesData} totalDocs={salesTotalDocs} sum={Math.floor(salesTotal / 1000)} title={'Tržby'} />
      <Card data={costsData} totalDocs={costsTotalDocs} sum={Math.floor(costsTotal / 1000)} title={'Naklady'} />
      <div className='chartCard'>
        <div className="title">
          Prehľad DPH
        </div>
        <div className='middle-card'>
          <div className="tax-table">
            <table className="table-sm table-borderless p-0" style={{ fontSize: '12px', borderSpacing: '0' }}>
              <thead>
                <tr>
                  <th className="px-4">Mesiac</th>
                  <th className="px-4">Suma</th>
                </tr>
              </thead>
              <tbody>
                {lastItems.map((item) => (
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