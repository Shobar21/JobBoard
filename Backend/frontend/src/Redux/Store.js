import { configureStore } from '@reduxjs/toolkit'
import { alertSlice } from './Feature/alertSlice.js'
import { authSlice } from './Feature/auth/authSlice.js'

export default configureStore({
  reducer: {
    alerts: alertSlice.reducer,
    auth: authSlice.reducer,
  },
})
