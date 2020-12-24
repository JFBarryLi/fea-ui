import { createSlice } from '@reduxjs/toolkit';
import TrussExample from 'pages/TrussPage/TrussExample';

const initialState = TrussExample.matProp;

const material = createSlice({
  name: 'material',
  initialState,
  reducers: {
    materialAdded: (state, action) => {
      const index = state.findIndex(material => material.ele === action.payload.ele);
      if (index === -1) {
        const newData = {
          'ele': action.payload.ele,
          'E': action.payload.E,
          'A': action.payload.A
        };
        state.push(newData);
      }
    },
    materialDeleted: (state, action) => {
      const index = state.findIndex(material => material.ele === action.payload.ele);
      if (index !== -1) state.splice(index, 1);
    },
    materialsDeleted: (state, action) => {
      action.payload.forEach(row => {
        const index = state.findIndex(material => material.ele === row.ele);
        if (index !== -1) state.splice(index, 1);
      });
    },
    materialUpdated: (state, action) => {
      let updateMaterial = state.find(material => material.ele === action.payload.old.ele);
      const index = state.findIndex(material => material.ele === action.payload.new.ele);
      if (index === -1 || action.payload.old.ele === action.payload.new.ele) {
        updateMaterial.ele = action.payload.new.ele;
        updateMaterial.E = action.payload.new.E;
        updateMaterial.A = action.payload.new.A;
      }
    },
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
