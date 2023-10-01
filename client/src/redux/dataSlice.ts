import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';

const dataSlice = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {
    setData: (state, action) => {
      return action.payload;
    },
    deleteItem: (state, action) => {
      state.balance = state.balance.filter(item => item.month !== action.payload.month);
    },
    addRowToTable: (state, action) => {
      state.balance.push(action.payload); 
    },
    updateRow: (state, action) => {
      const rowIndex = state.balance.findIndex((row) => row.month === action.payload.month);

      if (rowIndex !== -1) {
        state.balance[rowIndex] = { ...state.balance[rowIndex], ...action.payload };
      }
    },
  },
});

export const { setData, deleteItem, addRowToTable, updateRow } = dataSlice.actions;
export default dataSlice.reducer;