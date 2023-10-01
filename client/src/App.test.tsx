import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import CardDashboard from './components/CardDashboard/CardDashboard';
import DataTable from './components/DataTable/DataTable';

test('renders Business Analysis', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(screen.getByText(/Mesačné tržby a náklady/i)).toBeInTheDocument();
});

test('renders CardDashboard with data', () => {
  render(
    <Provider store={store}>
      <CardDashboard />
    </Provider>
  );

  expect(screen.getByText(/Tržby/i)).toBeInTheDocument();
  expect(screen.getByText(/Náklady/i)).toBeInTheDocument();
  expect(screen.getByText(/Prehľad DPH/i)).toBeInTheDocument();
});

test('renders DataTable with data', () => {

  render(
    <Provider store={store}>
      <DataTable />
    </Provider>
  );

  expect(screen.getByText(/Mesiac/i)).toBeInTheDocument();
  expect(screen.getByText(/Tržby/i)).toBeInTheDocument();
  expect(screen.getByText(/Náklady/i)).toBeInTheDocument();
  expect(screen.getByText(/Bilancia/i)).toBeInTheDocument();

  const addButton = screen.getByText(/Pridať Riadok/i);
  expect(addButton).toBeInTheDocument();
  fireEvent.click(addButton);
});

test('renders DataTable without data', () => {

  render(
    <Provider store={store}>
      <DataTable />
    </Provider>
  );

  expect(screen.getByText(/Mesiac/i)).toBeInTheDocument();
  expect(screen.getByText(/Tržby/i)).toBeInTheDocument();
  expect(screen.getByText(/Náklady/i)).toBeInTheDocument();
  expect(screen.getByText(/Bilancia/i)).toBeInTheDocument();

});