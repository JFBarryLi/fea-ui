import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getTrussResult } from 'api/feaAPI';

const initialState = {
  loading: 'idle',
  nodalCoords: [],
  stresses: []
};

export const fetchStruc = createAsyncThunk(
  'struc/fetchStrucStatus',
  async (body, thunkAPI) => {
    const response = await getTrussResult(body);
    return response;
  }
)

const struc = createSlice({
  name: 'struc',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchStruc.fufilled]: (state, action) => {
      state.nodalCoords = action.payload.data.nodalCoords;
      state.stresses = action.payload.data.stresses;
    }
  }
});

export const selectStruc = state => ({
  'matProp': state.material,
  'nodalCoords': state.nodes,
  'connectivity': state.elements,
  'forceVector': state.loads,
  'boundaryConditions': state.boundaries,
});

export default struc.reducer;
