import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BalanceInterface, StateDataInterface, StateInterface } from '../../interfaces';
import './DataTable.css';
import { formatDate } from '../../formatDate';
import { deleteItem, updateRow } from '../../redux/dataSlice';
import AddRowModal from '../Modal/AddRowModal';
import EditRowModal from '../Modal/EditRowModal';


const DataTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const balanceData = useSelector((state: StateInterface) => state.data.balance);
  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = useState(null);
  const formatNumber = (number: number) => {
    const parts = number.toFixed(2).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return `${parts.join(',')} E`;
  };
  const tableData = balanceData.map((item: any) => ({
    ...item,
    difference: item.salesAmount - item.costsAmount,
    salesAmountFormatted: formatNumber(item.salesAmount),
    costsAmountFormatted: formatNumber(item.costsAmount),
    differenceFormatted: formatNumber(item.salesAmount - item.costsAmount),
  }));
  const totalSales = formatNumber(tableData.reduce((total: number, item: BalanceInterface) => total + item.salesAmount, 0));
  const totalCosts = formatNumber(tableData.reduce((total: number, item: BalanceInterface) => total + item.costsAmount, 0));
  const totalDifference = formatNumber(tableData.reduce((total: any, item: any) => total + (item.salesAmount - item.costsAmount), 0));
  const handleEditClick = (item: any) => {
    setSelectedRow(item);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (item: any) => {
    dispatch(deleteItem({ month: item.month }));
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="container-wrapper">
        <table className="table table-borderless custom-table">
          <thead>
            <tr>
              <th scope="col">Mesiac</th>
              <th scope="col">Tržby</th>
              <th scope="col">Náklady</th>
              <th scope="col">Bilancia</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item: any) => (
              <tr key={item.month} className="table-row">
                <td>{formatDate(item.month)}</td>
                <td style={{ color: 'green' }}>{item.salesAmountFormatted}</td>
                <td style={{ color: 'red' }}>{item.costsAmountFormatted}</td>
                <td>{item.differenceFormatted}</td>
                <td className="table-row-actions">
                  <button
                    className=""
                    onClick={() => handleEditClick(item)}
                  >
                    Edit
                  </button>
                  <button
                    className=""
                    onClick={() => handleDeleteClick(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Spolu</td>
              <td style={{ color: 'green' }}>{totalSales}</td>
              <td style={{ color: 'red' }}>{totalCosts}</td>
              <td>{totalDifference}</td>
            </tr>
          </tfoot>
        </table>
        <button type="button" className="btn btn-primary" onClick={openModal} data-toggle="modal" data-target="#tableModal">Add to Table</button>
      </div>
      {isModalOpen && <AddRowModal show={isModalOpen} onHide={closeModal} />}
      {isEditModalOpen && (
        <EditRowModal
          show={isEditModalOpen}
          onHide={() => setIsEditModalOpen(false)}
          selectedRow={selectedRow}
          onSave={(editedRowData: any) => {
            dispatch(updateRow(editedRowData));
            setIsEditModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default DataTable;

