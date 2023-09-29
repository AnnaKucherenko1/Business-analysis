import React from 'react';
import { useSelector } from 'react-redux';
import { State } from '../../interfaces';
import './DataTable.css';

const formatNumber = (number: number) => {
  const parts = number.toFixed(2).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return `${parts.join(',')} E`;
};

const DataTable = () => {
  const balanceData = useSelector((state: State) => state.balance);
  const tableData = balanceData.map(item => ({
    ...item,
    difference: item.salesAmount - item.costsAmount,
    salesAmountFormatted: formatNumber(item.salesAmount),
    costsAmountFormatted: formatNumber(item.costsAmount),
    differenceFormatted: formatNumber(item.salesAmount - item.costsAmount),
  }));

  const totalSales = formatNumber(tableData.reduce((total, item) => total + parseFloat(item.salesAmount), 0));
  const totalCosts = formatNumber(tableData.reduce((total, item) => total + parseFloat(item.costsAmount), 0));
  const totalDifference = formatNumber(tableData.reduce((total, item) => total + (item.salesAmount - item.costsAmount), 0));

  return (
    <div className="container">
      <table className="table table-sm table-borderless" style={{ fontSize: '9px', borderSpacing: '0' }}>
        <thead>
          <tr>
            <th>Mesiac</th>
            <th>Tržby</th>
            <th>Náklady</th>
            <th>Bilancia</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(item => (
            <tr key={item.month}>
              <td>{item.month}</td>
              <td style={{ color: 'green' }}>{item.salesAmountFormatted}</td>
              <td style={{ color: 'red' }}>{item.costsAmountFormatted}</td>
              <td>{item.differenceFormatted}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td style={{ color: 'green' }}>{totalSales}</td>
            <td style={{ color: 'red' }}>{totalCosts}</td>
            <td>{totalDifference}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default DataTable;