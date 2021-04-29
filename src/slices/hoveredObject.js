import { createSlice } from '@reduxjs/toolkit';

const initialState = { name: '', content: '' };

const hoveredObject = createSlice({
  name: 'hoveredObject',
  initialState,
  reducers: {
    hoveredObjectUpdated(state, action) {
      state.name = action.payload.name;
      state.content = action.payload.content;
    },
  },
});

export const {
  hoveredObjectUpdated
} = hoveredObject.actions;

export const selectHoveredObject = state => state.hoveredObject;

export default hoveredObject.reducer;
