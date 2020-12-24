import { createSlice } from '@reduxjs/toolkit';
import TrussExample from 'pages/TrussPage/TrussExample';

const initialState = TrussExample.forceVector;

const loads = createSlice({
  name: 'loads',
  initialState,
  reducers: {
    loadAdded: (state, action) => {
      const index = state.findIndex(load => load.node === action.payload.node);
      if (index === -1) {
        const newData = {
          'node': action.payload.node,
          'u1': action.payload.u1,
          'u2': action.payload.u2,
          'u3': action.payload.u3
        };
        state.push(newData);
      }
    },
    loadDeleted: (state, action) => {
      const index = state.findIndex(load => load.node === action.payload.node);
      if (index !== -1) state.splice(index, 1);
    },
    loadsDeleted: (state, action) => {
      action.payload.forEach(row => {
        const index = state.findIndex(load => load.node === row.node);
        if (index !== -1) state.splice(index, 1);
      });
    },
    loadUpdated: (state, action) => {
      let updateLoad = state.find(load => load.node === action.payload.old.node);
      const index = state.findIndex(load => load.node === action.payload.new.node);
      if (index === -1 || action.payload.old.node === action.payload.new.node) {
        updateLoad.node = action.payload.new.node;
        updateLoad.u1 = action.payload.new.u1;
        updateLoad.u2 = action.payload.new.u2;
        updateLoad.u3 = action.payload.new.u3;
      }
    },
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
