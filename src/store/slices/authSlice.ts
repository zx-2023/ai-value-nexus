
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'enterprise' | 'developer';
  avatar: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  currentRole: 'enterprise' | 'developer';
}

const initialState: AuthState = {
  user: {
    id: '1',
    name: 'John Doe',
    email: 'john@company.com',
    role: 'enterprise',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  isAuthenticated: true,
  currentRole: 'enterprise',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.currentRole = action.payload.role;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.currentRole = 'enterprise';
    },
    switchRole: (state, action: PayloadAction<'enterprise' | 'developer'>) => {
      state.currentRole = action.payload;
    },
  },
});

export const { login, logout, switchRole } = authSlice.actions;
export default authSlice.reducer;
