import { createSlice } from '@reduxjs/toolkit';
import TrussExample from 'pages/TrussPage/TrussExample';
import {
  createItemAdded,
  createItemDeleted,
  createItemsDeleted,
  createItemUpdated
} from 'reducers/crudReducers';

const initialState = TrussExample.boundaryConditions;

const boundaries = createSlice({
  name: 'boundaries',
  initialState,
  reducers: {
    boundaryAdded: createItemAdded(
      'node',
      {
        'node': 'node',
        'u1': 'u1',
        'u2': 'u2',
        'u3': 'u3'
      }
    ),
    boundaryDeleted: createItemDeleted('node'),
    boundariesDeleted: createItemsDeleted('node'),
    boundaryUpdated: createItemUpdated('node')
  }
});

export const {
  boundaryAdded,
  boundaryDeleted,
  boundariesDeleted,
  boundaryUpdated
} = boundaries.actions;

export const selectBoundaries = state => state.boundaries;

export default boundaries.reducer;
