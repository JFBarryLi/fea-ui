import { createSlice } from '@reduxjs/toolkit';
import TrussExample from 'pages/TrussPage/TrussExample';
import {
  createItemAdded,
  createItemDeleted,
  createItemsDeleted,
  createItemUpdated
} from 'reducers/crudReducers';

const initialState = TrussExample.matProp;

const material = createSlice({
  name: 'material',
  initialState,
  reducers: {
    materialAdded: createItemAdded(
      'ele',
      {
        'ele': 'ele',
        'E': 'E',
        'A': 'A'
      }
    ),
    materialDeleted: createItemDeleted('ele'),
    materialsDeleted: createItemsDeleted('ele'),
    materialUpdated: createItemUpdated('ele')
  }
});

export const {
  materialAdded,
  materialDeleted,
  materialsDeleted,
  materialUpdated
} = material.actions;

export const selectMaterial = state => state.material;

export default material.reducer;
