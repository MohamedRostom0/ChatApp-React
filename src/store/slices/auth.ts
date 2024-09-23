import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthState {
  token: string;
  isLoggedIn: boolean;
  user: User | null;
}

// Function to save auth data to sessionStorage
const saveAuthDataToSession = (authData: AuthState) => {
  sessionStorage.setItem("authData", JSON.stringify(authData));
};

// Function to load auth data from sessionStorage
const loadAuthDataFromSession = (): AuthState | null => {
  const savedData = sessionStorage.getItem("authData");
  return savedData ? JSON.parse(savedData) : null;
};

// Load initial state from sessionStorage or use default state
const initialState: AuthState = loadAuthDataFromSession() || {
  token: "",
  isLoggedIn: false,
  user: null,
};

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; user: User }>) => {
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.user = action.payload.user;
      saveAuthDataToSession(state); // Save current state to sessionStorage
    },

    logout: (state) => {
      state.token = "";
      state.isLoggedIn = false;
      state.user = null;
      saveAuthDataToSession(state); // Clear session storage
    },
  },
});

// Export actions
export const authActions = authSlice.actions;

// Export reducer
export default authSlice.reducer;
