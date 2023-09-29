import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBalance } from '../redux/balanceSlice';
import axios from 'axios';
import MonthlyChart from '../components/MonthlyChart/MonthlyChart';
import DataTable from '../components/DataTable/DataTable';
import './Analysis.css'

const Analysis = () => {
  const dispatch = useDispatch();
  const balanceData = useSelector((state: { balance: any; }) => state.balance);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('https://priklad.docflow.ai/');
        console.log(response)
        dispatch(setBalance(response.data.balance));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, [dispatch]);

  return (
    <div className='wrapper'>
      <div className='charts'>
        <MonthlyChart />
        <DataTable />
      </div>
    </div>
  );
};

export default Analysis;