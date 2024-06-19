import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        email: null,
        username: null,
        // token: null,
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        loginSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.error = false;
            state.email = action.payload.email;
            state.username = action.payload.username;
            // state.token = action.payload.access_token;
        },
        loginFailed: (state) => {
            state.isLoggedIn = false;
        },
        logoutSuccess: (state) => {
            state.isLoggedIn = false;
            state.email = null;
            state.username = null;
            // state.token = null;
        },
        logoutFailed: (state) => {
            state.isLoggedIn = false;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
