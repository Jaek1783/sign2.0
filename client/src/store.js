import { configureStore } from '@reduxjs/toolkit'
import userReducer from './State/userSlice';

export const store = configureStore({
  reducer: {
    userData: userReducer
  },
});
