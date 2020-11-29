import { createSlice } from '@reduxjs/toolkit';
import TrussExample from 'pages/TrussPage/TrussExample';

const initialState = TrussExample;

const trussSlice = createSlice({
  name: 'truss',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
});

export const { increment, decrement, incrementByAmount } = trussSlice.actions;

export const selectNodes = state => state.truss.nodalCoords;

export default trussSlice.reducer;
