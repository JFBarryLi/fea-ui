import { createSlice } from '@reduxjs/toolkit';
import TrussExample from 'pages/TrussPage/TrussExample';

const initialState = TrussExample.nodalCoords;

const nodes = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    nodeAdded: (state, action) => {
      const index = state.findIndex(node => node.id === action.payload.id);
      if (index === -1) {
        const newData = {
          'id': action.payload.id,
          'x': action.payload.x,
          'y': action.payload.y,
          'z': action.payload.z
        };
        state.push(newData);
      }
    },
    nodeDeleted: (state, action) => {
      const index = state.findIndex(node => node.id === action.payload.id);
      if (index !== -1) state.splice(index, 1);
    },
    nodesDeleted: (state, action) => {
      action.payload.forEach(row => {
        const index = state.findIndex(node => node.id === row.id);
        if (index !== -1) state.splice(index, 1);
      });
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
    nodesUpdated: (state, action) => {
      state.forEach(node => {
        const found = action.payload.find( n => n.id === node.id );
        if (found) {
          node.x = found.x;
          node.y = found.y;
          node.z = found.z;
        }
      });
    }
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
