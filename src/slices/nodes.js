import { createSlice } from '@reduxjs/toolkit';
import TrussExample from 'pages/TrussPage/TrussExample';
import {
  createItemAdded,
  createItemDeleted,
  createItemsDeleted,
  createItemUpdated,
  createItemsUpdated
} from 'reducers/crudReducers';

const initialState = TrussExample.nodalCoords;

const nodes = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    nodeAdded: createItemAdded(
      'id',
      {
        'id': 'id',
        'x': 'x',
        'y': 'y',
        'z': 'z'
      }
    ),
    nodeDeleted: createItemDeleted('id'),
    nodesDeleted: createItemsDeleted('id'),
    nodeUpdated: createItemUpdated('id'),
    nodesUpdated: createItemsUpdated('id')
  }
});

export const {
  nodeAdded,
  nodeDeleted,
  nodesDeleted,
  nodeUpdated,
  nodesUpdated
} = nodes.actions;

export const selectNodes = state => state.nodes;

export default nodes.reducer;
