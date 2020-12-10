import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import nodes from 'slices/nodes';
import elements from 'slices/elements';

const rootReducer = combineReducers({
  nodes,
  elements,
});

export default configureStore({
  reducer: rootReducer
});
