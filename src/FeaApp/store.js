import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import nodes from 'slices/nodes';
import elements from 'slices/elements';
import material from 'slices/material';

const rootReducer = combineReducers({
  nodes,
  elements,
  material,
});

export default configureStore({
  reducer: rootReducer
});
