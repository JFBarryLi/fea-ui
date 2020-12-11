import { createSlice } from '@reduxjs/toolkit';
import TrussExample from 'pages/TrussPage/TrussExample';

const initialState = TrussExample.boundaryConditions;

const boundaries = createSlice({
  name: 'boundaries',
  initialState,
  reducers: {
    boundaryAdded: (state, action) => {
      const index = state.findIndex(boundary => boundary.node === action.payload.node);
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
    boundaryDeleted: (state, action) => {
      const index = state.findIndex(boundary => boundary.node === action.payload.node);
      if (index !== -1) state.splice(index, 1);
    },
    boundaryUpdated: (state, action) => {
      let updateBoundary = state.find(boundary => boundary.node === action.payload.old.node);
      const index = state.findIndex(boundary => boundary.node === action.payload.new.node);
      if (index === -1 || action.payload.old.node === action.payload.new.node) {
        updateBoundary.node = action.payload.new.node;
        updateBoundary.u1 = action.payload.new.u1;
        updateBoundary.u2 = action.payload.new.u2;
        updateBoundary.u3 = action.payload.new.u3;
      }
    },
  }
});

export const { boundaryAdded, boundaryDeleted, boundaryUpdated } = boundaries.actions;

export const selectBoundaries = state => state.boundaries;

export default boundaries.reducer;
