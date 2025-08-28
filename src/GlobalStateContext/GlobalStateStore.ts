import { configureStore } from '@reduxjs/toolkit';
import {authReducer} from './AuthSlice';

// Configure the store
const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });
  
// Export the store
export default store;