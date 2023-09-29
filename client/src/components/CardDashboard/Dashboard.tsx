import React from 'react';
import { useSelector } from 'react-redux';
import { StateInterface } from '../../interfaces';
import Card from './Card';
import './CardDashboard.css'

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

  // const totalCosts = costs.reduce((acc: any, cost: any) => acc + cost, 0);
  // const totalSales = sales.reduce((acc: any, sale: any) => acc + sale, 0);

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
    // costs: costs,
    // sales: sales,
    total: sales.map((sale, index) => sale - costs[index]),
  };
  console.log(bilancia)

  return (
    <div className="dashboard">
      <Card data={bilancia} totalDocs={totalDocs} sum={totalSum} />
      <Card data={costsData} totalDocs={costsTotalDocs} sum={costsTotal} />
      <Card data={salesData} totalDocs={salesTotalDocs} sum={salesTotal} />
    </div>
  );
};

export default Dashboard;