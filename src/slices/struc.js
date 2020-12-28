import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getTrussResult } from 'api/feaAPI';

const initialState = {
  loading: 'idle',
  error: {},
};

export const fetchStruc = createAsyncThunk(
  'struc/fetchStrucStatus',
  async (body, { rejectWithValue }) => {
    try {
      const response = await getTrussResult(body);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
)

const struc = createSlice({
  name: 'struc',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchStruc.fulfilled]: (state, action) => {
      state.loading = 'succeeded';
    },
    [fetchStruc.rejected]: (state, action) => {
      state.loading = 'failed';
      state.error = action.payload;
    },
    [fetchStruc.pending]: (state, action) => {
      state.loading = 'loading';
    },
  }
});

export const selectStruc = state => ({
  'matProp': state.material,
  'nodalCoords': state.nodes,
  'connectivity': state.elements,
  'forceVector': state.loads,
  'boundaryConditions': state.boundaries,
  'stresses': state.stress,
});

export const selectStrucError = state => state.struc.error;

export const selectStrucLoading = state => state.struc.loading;

export default struc.reducer;
