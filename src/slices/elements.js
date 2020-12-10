import { createSlice } from '@reduxjs/toolkit';
import TrussExample from 'pages/TrussPage/TrussExample';

const initialState = TrussExample.connectivity;

const elements = createSlice({
  name: 'elements',
  initialState,
  reducers: {
  }
});

export const selectElements = state => state.elements;

export default elements.reducer;
