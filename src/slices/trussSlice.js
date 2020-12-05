import { createSlice } from '@reduxjs/toolkit';
import TrussExample from 'pages/TrussPage/TrussExample';

const initialState = TrussExample;

const trussSlice = createSlice({
  name: 'truss',
  initialState,
  reducers: {
    updateNodes: (state, action) => {
      state.truss.nodalCoords = action.payload
    }
  }
});

export const { updateNodes } = trussSlice.actions;

export const selectNodes = state => state.truss.nodalCoords;
export const selectElements = state => state.truss.connectivity;

export default trussSlice.reducer;
