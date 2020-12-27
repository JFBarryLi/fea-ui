import { createSlice } from '@reduxjs/toolkit';
import TrussExample from 'pages/TrussPage/TrussExample';
import {
  createItemAdded,
  createItemsAdded,
  createItemDeleted,
  createItemsDeleted,
  createCascadeItemDeleted,
  createCascadeItemsDeleted,
  createItemUpdated,
  createItemsUpdated,
} from 'reducers/crudReducers';
import { elementDeleted, elementsDeleted } from 'slices/elements';
import { nodeDeleted, nodesDeleted } from 'slices/nodes';

const initialState = TrussExample.stresses;

const stress = createSlice({
  name: 'stress',
  initialState,
  reducers: {
    stressAdded: createItemAdded(
      'ele',
      {
        'ele': 'ele',
        'vm': 'vm',
      }
    ),
    stressesAdded: createItemsAdded(
      'ele',
      {
        'ele': 'ele',
        'vm': 'vm',
      }
    ),
    stressDeleted: createItemDeleted('ele'),
    stressesDeleted: createItemsDeleted('ele'),
    stressUpdated: createItemUpdated('ele'),
    stressesUpdated: createItemsUpdated('ele'),
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
  stressAdded,
  stressesAdded,
  stressDeleted,
  stressesDeleted,
  stressUpdated,
  stressesUpdated,
} = stress.actions;

export const selectStress = state => state.stress;

export const selectMinMaxStress = state => ({
  'min': state.stress.reduce((min, o) => o.vm < min ? o.vm : min, 0),
  'max': state.stress.reduce((max, o) => o.vm > max ? o.vm : max, 0),
})

export default stress.reducer;
