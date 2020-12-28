import { createSlice } from '@reduxjs/toolkit';
import TrussExample from 'pages/TrussPage/TrussExample';
import {
  createItemAdded,
  createItemDeleted,
  createItemsDeleted,
  createCascadeItemDeleted,
  createCascadeItemsDeleted,
  createItemUpdated,
} from 'reducers/crudReducers';
import { nodeDeleted, nodesDeleted } from 'slices/nodes';

const initialState = TrussExample.connectivity;

const elements = createSlice({
  name: 'elements',
  initialState,
  reducers: {
    elementAdded: createItemAdded(
      'id',
      {
        'id': 'id',
        'i': 'i',
        'j': 'j'
      }
    ),
    elementDeleted: createItemDeleted('id'),
    elementsDeleted: createItemsDeleted('id'),
    elementUpdated: createItemUpdated('id'),
  },
  extraReducers: {
    [nodeDeleted]: createCascadeItemDeleted('id', ['i', 'j']),
    [nodesDeleted]: createCascadeItemsDeleted('id', ['i', 'j']),
  },
});

export const {
  elementAdded,
  elementDeleted,
  elementsDeleted,
  elementUpdated
} = elements.actions;

export const selectElements = state => state.elements;

export default elements.reducer;
