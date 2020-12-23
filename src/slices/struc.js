import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getTrussResult } from 'api/feaAPI';

const initialState = {
  loading: 'idle'
};

export const fetchStruc = createAsyncThunk(
  'struc/fetchStrucStatus',
  async (body, { rejectWithValue }) => {
    try {
      const response = await getTrussResult(body);
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
)

const struc = createSlice({
  name: 'struc',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchStruc.fufilled]: (state, action) => {
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
