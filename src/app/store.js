import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../Components/features/counter/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer
  },
})

export default store;