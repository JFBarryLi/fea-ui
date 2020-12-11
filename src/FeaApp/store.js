import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import nodes from 'slices/nodes';
import elements from 'slices/elements';
import material from 'slices/material';
import loads from 'slices/loads';
import boundaries from 'slices/boundaries';

const rootReducer = combineReducers({
  nodes,
  elements,
  material,
  loads,
  boundaries,
});

export default configureStore({
  reducer: rootReducer
});
