import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('token');
const email = localStorage.getItem('email');

const initialAuthState = {
  isAuthenticated: !!token,
  email: email,
  token: token,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.idToken;
      state.email = action.payload.email;

      localStorage.setItem('token', action.payload.idToken);
      localStorage.setItem('email', action.payload.email);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.email = null;

      localStorage.removeItem('token');
      localStorage.removeItem('email');
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
