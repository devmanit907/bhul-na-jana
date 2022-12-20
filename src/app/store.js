import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../Components/features/authorize/authSlice';
import eventSlice from '../Components/features/authorize/eventSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    event: eventSlice
  },
})

export default store;