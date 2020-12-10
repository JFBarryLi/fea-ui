import { createSlice } from '@reduxjs/toolkit';
import TrussExample from 'pages/TrussPage/TrussExample';

const initialState = TrussExample.nodalCoords;

const nodes = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    nodeAdded: (state, action) => {
      state.push(action.payload);
    },
    nodeDeleted: (state, action) => {
      const index = state.findIndex(node => node.id === action.payload.id);
      if (index !== -1) state.splice(index, 1);
    },
    nodeUpdated: (state, action) => {
      let updateNode = state.find(node => node.id === action.payload.old.id);
      const index = state.findIndex(node => node.id === action.payload.new.id);
      if (index === -1 || action.payload.old.id === action.payload.new.id) {
        updateNode.id = action.payload.new.id;
        updateNode.x = action.payload.new.x;
        updateNode.y = action.payload.new.y;
        updateNode.z = action.payload.new.z;
      }
    },
  }
});

export const { nodeAdded, nodeDeleted, nodeUpdated } = nodes.actions;

export const selectNodes = state => state.nodes;

export default nodes.reducer;
