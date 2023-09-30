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
      console.log(action.payload, 'action pay')
      state.balance.push(action.payload); 
    },
  },
});

export const { setData, deleteItem, addRowToTable } = dataSlice.actions;
export default dataSlice.reducer;