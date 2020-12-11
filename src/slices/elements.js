import { createSlice } from '@reduxjs/toolkit';
import TrussExample from 'pages/TrussPage/TrussExample';

const initialState = TrussExample.connectivity;

const elements = createSlice({
  name: 'elements',
  initialState,
  reducers: {
    elementAdded: (state, action) => {
      const newData = {
        'id': action.payload.id,
        'i': action.payload.i,
        'j': action.payload.j
      };
      state.push(newData);
    },
    elementDeleted: (state, action) => {
      const index = state.findIndex(element => element.id === action.payload.id);
      if (index !== -1) state.splice(index, 1);
    },
    elementUpdated: (state, action) => {
      let updateelement = state.find(element => element.id === action.payload.old.id);
      const index = state.findIndex(element => element.id === action.payload.new.id);
      if (index === -1 || action.payload.old.id === action.payload.new.id) {
        updateelement.id = action.payload.new.id;
        updateelement.i = action.payload.new.i;
        updateelement.j = action.payload.new.j;
      }
    },
  }
});

export const { elementAdded, elementDeleted, elementUpdated } = elements.actions;

export const selectElements = state => state.elements;

export default elements.reducer;
