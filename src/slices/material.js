import { createSlice } from '@reduxjs/toolkit';
import TrussExample from 'pages/TrussPage/TrussExample';

const initialState = TrussExample.matProp;

const material = createSlice({
  name: 'material',
  initialState,
  reducers: {
    materialAdded: (state, action) => {
      const newData = {
        'id': action.payload.id,
        'E': action.payload.E,
        'A': action.payload.A
      };
      state.push(newData);
    },
    materialDeleted: (state, action) => {
      const index = state.findIndex(material => material.id === action.payload.id);
      if (index !== -1) state.splice(index, 1);
    },
    materialUpdated: (state, action) => {
      let updateMaterial = state.find(material => material.id === action.payload.old.id);
      const index = state.findIndex(material => material.id === action.payload.new.id);
      if (index === -1 || action.payload.old.id === action.payload.new.id) {
        updateMaterial.id = action.payload.new.id;
        updateMaterial.E = action.payload.new.E;
        updateMaterial.A = action.payload.new.A;
      }
    },
  }
});

export const { materialAdded, materialDeleted, materialUpdated } = material.actions;

export const selectMaterial = state => state.material;

export default material.reducer;
