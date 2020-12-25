import { createSlice } from '@reduxjs/toolkit';
import TrussExample from 'pages/TrussPage/TrussExample';
import {
  createItemAdded,
  createItemDeleted,
  createItemsDeleted,
  createItemUpdated
} from 'reducers/crudReducers';

const initialState = TrussExample.connectivity;

const elements = createSlice({
  name: 'elements',
  initialState,
  reducers: {
    elementAdded: createItemAdded(
      'id',
      {
        'id': 'id',
        'i': 'j',
        'j': 'j'
      }
    ),
    elementDeleted: createItemDeleted('id'),
    elementsDeleted: createItemsDeleted('id'),
    elementUpdated: createItemUpdated('id'),
  }
});

export const {
  elementAdded,
  elementDeleted,
  elementsDeleted,
  elementUpdated
} = elements.actions;

export const selectElements = state => state.elements;

export default elements.reducer;
