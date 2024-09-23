import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth";

// Define the RootState type based on the store's reducer structure
export type RootState = ReturnType<typeof store.getState>;

// Define AppDispatch type for proper typing of dispatch function
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: { 
    auth: authSlice.reducer 
  },
});

export default store;
