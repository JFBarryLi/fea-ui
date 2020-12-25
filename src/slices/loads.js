import { createSlice } from '@reduxjs/toolkit';
import TrussExample from 'pages/TrussPage/TrussExample';
import {
  createItemAdded,
  createItemDeleted,
  createItemsDeleted,
  createItemUpdated
} from 'reducers/crudReducers';

const initialState = TrussExample.forceVector;

const loads = createSlice({
  name: 'loads',
  initialState,
  reducers: {
    loadAdded: createItemAdded(
      'node',
      {
        'node': 'node',
        'u1': 'u1',
        'u2': 'u2',
        'u3': 'u3'
      }
    ),
    loadDeleted: createItemDeleted('node'),
    loadsDeleted: createItemsDeleted('node'),
    loadUpdated: createItemUpdated('node'),
  }
});

export const {
  loadAdded,
  loadDeleted,
  loadsDeleted,
  loadUpdated
} = loads.actions;

export const selectLoads = state => state.loads;

export default loads.reducer;
