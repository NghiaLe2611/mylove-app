import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        isLogging: false,
        email: null,
        username: null,
        error: null,
        // token: null,
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        loginSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.email = action.payload.email;
            state.username = action.payload.username;
            // state.error = false;
            // state.token = action.payload.access_token;
        },
        currentlyLogin: (state, action) => {
            state.isLogging = true;
        },
        loginFailed: (state) => {
            state.isLoggedIn = false;
            state.isLogging = false;
        },
        logoutSuccess: (state) => {
            state.isLoggedIn = false;
            state.email = null;
            state.username = null;
            state.isLogging = false;
            // state.token = null;
        },
        logoutFailed: (state) => {
            state.isLoggedIn = false;
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
