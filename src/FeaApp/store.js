import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import nodes from 'slices/nodes';
import elements from 'slices/elements';
import material from 'slices/material';
import loads from 'slices/loads';
import boundaries from 'slices/boundaries';
import struc from 'slices/struc';
import stress from 'slices/stress';
import hoveredObject from 'slices/hoveredObject';

const rootReducer = combineReducers({
  nodes,
  elements,
  material,
  loads,
  boundaries,
  struc,
  stress,
  hoveredObject,
});

export default configureStore({
  reducer: rootReducer
});
