import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../redux/dataSlice';
import axios from 'axios';
import MonthlyChart from '../components/MonthlyChart/MonthlyChart';
import DataTable from '../components/DataTable/DataTable';
import './Analysis.css'
import CardDashboard from '../components/CardDashboard/CardDashboard';
import ChartPies from '../components/ChartPies/ChartPies';
import { BalanceInterface, StateInterface } from '../interfaces';
import { formatDate } from '../formatDate';
import { AiOutlinePieChart, AiTwotoneCalendar } from 'react-icons/ai';

const Analysis = () => {
  const dispatch = useDispatch();
  const balanceData = useSelector((state: StateInterface) => state.data.balance);
  const months = balanceData.map((item: BalanceInterface) => item.month);
  const dateFrom = formatDate(months[0])
  const dateTo = formatDate(months[months.length - 1])

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('https://priklad.docflow.ai/');
        dispatch(setData(response.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, [dispatch]);

  return (
    <div className='wrapper'>
      <div className='header-wrapper'>
        <h5 className='pageTitle'>
          <AiOutlinePieChart />Biznis analyza</h5>
        <h5 className='obdobie'>
          <AiTwotoneCalendar /> Obdobie ({dateFrom}-{dateTo})
        </h5>
      </div>
      <CardDashboard />
      <div className='charts'>
        <MonthlyChart />
        <DataTable />
      </div>
      <ChartPies />
    </div>
  );
};

export default Analysis;