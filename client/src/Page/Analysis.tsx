import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../redux/dataSlice';
import axios from 'axios';
import MonthlyChart from '../components/MonthlyChart/MonthlyChart';
import DataTable from '../components/DataTable/DataTable';
import './Analysis.css'
import Pie from '../components/Pie/Pie';
import Dashboard from '../components/CardDashboard/Dashboard';

const Analysis = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('https://priklad.docflow.ai/');
        console.log(response)
        dispatch(setData(response.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, [dispatch]);

  return (
    <div className='wrapper'>
      <Dashboard />
      <div className='charts'>
        <MonthlyChart />
        <DataTable />
      </div>
      <Pie />
    </div>
  );
};

export default Analysis;