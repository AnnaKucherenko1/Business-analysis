import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setData } from '../redux/dataSlice';
import MonthlyChart from '../components/MonthlyChart/MonthlyChart';
import DataTable from '../components/DataTable/DataTable';
import './Analysis.css';
import CardDashboard from '../components/CardDashboard/CardDashboard';
import ChartPies from '../components/ChartPies/ChartPies';
import { BalanceInterface, StateInterface } from '../interfaces';
import { formatDate } from '../common/utils';
import { AiOutlinePieChart, AiTwotoneCalendar } from 'react-icons/ai';
import { getData } from '../services';

const Analysis = () => {
  const dispatch = useDispatch();
  const balanceData = useSelector(
    (state: StateInterface) => state.data.balance
  );
  const months = balanceData.map((item: BalanceInterface) => item.month);

  const datesRange = useMemo(() => {
    return {
      from: formatDate(months[0]),
      to: formatDate(months[months.length - 1]),
    };
  }, [months]);

  useEffect(() => {
    getData().then((response) => {
      dispatch(setData(response?.data));
    });
  }, [dispatch]);

  return (
    <div className='wrapper'>
      <div className='header-wrapper'>
        <h5 className='pageTitle'>
          <AiOutlinePieChart />
          Biznis analýza
        </h5>
        <h5 className='obdobie'>
          <AiTwotoneCalendar /> Obdobie ({datesRange.from}-{datesRange.to})
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
