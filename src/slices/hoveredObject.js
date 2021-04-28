import { createSlice } from '@reduxjs/toolkit';

const initialState = { name: 'test', content: 'test' };

const hoveredObject = createSlice({
  name: 'hoveredObject',
  initialState,
  reducers: {
    hoveredUpdated(state, action) {
      state.name = action.name;
      state.content = action.content;
    },
  },
});

export const {
  hoveredUpdated
} = hoveredObject.actions;

export const selectHoveredObject = state => state.hoveredObject;

export default hoveredObject.reducer;
