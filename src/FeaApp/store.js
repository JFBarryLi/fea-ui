import { configureStore } from '@reduxjs/toolkit'

import trussReducer from 'slices/trussSlice'

export default configureStore({
  reducer: {
      truss: trussReducer
  }
})
