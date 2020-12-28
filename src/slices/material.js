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
import { elementDeleted, elementsDeleted } from 'slices/elements';
import { nodeDeleted, nodesDeleted } from 'slices/nodes';

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
    materialUpdated: createItemUpdated('ele'),
  },
  extraReducers: {
    [elementDeleted]: createCascadeItemDeleted('id', ['ele']),
    [elementsDeleted]: createCascadeItemsDeleted('id', ['ele']),
    [nodeDeleted]: (state, action) => {
      action.payload.eles.forEach( ele => {
        state = state.filter(obj => obj.ele !== ele.id);
      });
      return state;
    },
    [nodesDeleted]: (state, action) => {
      action.payload.forEach(row => {
        row.eles.forEach(ele => {
          state = state.filter(obj => obj.ele !== ele.id);
        });
      });
      return state;
    },
  },
});

export const {
  materialAdded,
  materialDeleted,
  materialsDeleted,
  materialUpdated
} = material.actions;

export const selectMaterial = state => state.material;

export default material.reducer;
