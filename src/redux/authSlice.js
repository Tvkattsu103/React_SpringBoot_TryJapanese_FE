import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: 'auth',
    initialState: {
        user: {
            username: "",
            isLoggedIn: "",
            isAdmin: false,
        }
    },
    reducers: {
        loginRequest: (state, action) => {
            state = action.payload
        },
        logoutRequest: (state, action) => {
            state = action.payload
        },
        success: (state, action) => {
            state.user = action.payload
        },
        failure: (state, action) => {
            state = action.payload
        }
    }
})