import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BalanceInterface,
  BalanceItem,
  StateInterface,
} from '../../interfaces';
import './DataTable.css';
import { formatDate, formatNumber } from '../../common/utils';
import { deleteItem, updateRow } from '../../redux/dataSlice';
import AddRowModal from '../Modal/AddRowModal';
import EditRowModal from '../Modal/EditRowModal';
import { Button } from 'react-bootstrap';
import { initialValueRedux, lastElevenElements } from '../../common/constants';

const DataTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const balanceData = useSelector(
    (state: StateInterface) => state.data.balance
  );
  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = useState({});

  const tableData = useMemo(() => {
    return balanceData.map((item: BalanceInterface) => ({
      ...item,
      difference: item.salesAmount - item.costsAmount,
      salesAmountFormatted: formatNumber(item.salesAmount),
      costsAmountFormatted: formatNumber(item.costsAmount),
      differenceFormatted: formatNumber(item.salesAmount - item.costsAmount),
    }));
  }, [balanceData]);

  const last11TableData = tableData.slice(lastElevenElements);

  const totalSales = useMemo(() => {
    return tableData.reduce(
      (total: number, item: BalanceInterface) => total + item.salesAmount,
      initialValueRedux
    );
  }, [tableData]);

  const totalCosts = useMemo(() => {
    return formatNumber(
      tableData.reduce(
        (total: number, item: BalanceInterface) => total + item.costsAmount,
        initialValueRedux
      )
    );
  }, [tableData]);

  const totalDifference = useMemo(() => {
    return formatNumber(
      tableData.reduce(
        (total: any, item: any) => total + (item.salesAmount - item.costsAmount),
        initialValueRedux
      )
    );
  }, [tableData]);

  const handleEditClick = (item: BalanceItem) => {
    setSelectedRow(item);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (item: BalanceItem) => {
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
      <div className='container-wrapper'>
        <Button
          variant='outline-dark'
          type='button'
          className='btn btn-sm btn-block'
          onClick={openModal}
          data-toggle='modal'
          data-target='#tableModal'
        >
          Pridať Riadok
        </Button>
        <table className='table table-borderless custom-table'>
          <thead>
            <tr className='tr-row'>
              <th scope='col'>Mesiac</th>
              <th scope='col'>Tržby</th>
              <th scope='col'>Náklady</th>
              <th scope='col'>Bilancia</th>
            </tr>
          </thead>
          <tbody>
            {last11TableData.map((item: BalanceItem) => (
              <tr key={item.month} className='table-row tr-row'>
                <td>{formatDate(item.month)}</td>
                <td style={{ color: '#29ab87' }}>
                  {item.salesAmountFormatted}
                </td>
                <td style={{ color: '#FF4C4C' }}>
                  {item.costsAmountFormatted}
                </td>
                <td>{item.differenceFormatted}</td>
                <td className='table-row-actions'>
                  <button
                    className='button'
                    onClick={() => handleEditClick(item)}
                  >
                    Edit
                  </button>
                  <button
                    className='button'
                    onClick={() => handleDeleteClick(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className='tr-row'>
              <td>SPOLU</td>
              <td style={{ color: '#29ab87' }}>{totalSales}</td>
              <td style={{ color: '#FF4C4C' }}>{totalCosts}</td>
              <td>{totalDifference}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      {isModalOpen && <AddRowModal show={isModalOpen} onHide={closeModal} />}
      {isEditModalOpen && (
        <EditRowModal
          show={isEditModalOpen}
          onHide={() => setIsEditModalOpen(false)}
          selectedRow={selectedRow}
          onSave={(editedRowData: FormData) => {
            dispatch(updateRow(editedRowData));
            setIsEditModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default DataTable;
