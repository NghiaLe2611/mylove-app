import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        email: null,
        token: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.error = false;
            state.email = action.payload.email;
            state.token = action.payload.access_token;
        },
        loginFailed: (state) => {
            state.isLoggedIn = false;
        },
        logoutSuccess: (state) => {
            state.isLoggedIn = false;
            state.email = null;
            state.token = null;
        },
        logoutFailed: (state) => {
            state.isLoggedIn = false;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
