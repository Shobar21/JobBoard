import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      console.log('Dispatching setUser:', action.payload)
      state.user = action.payload
    },
  },
})

export const { setUser } = authSlice.actions
