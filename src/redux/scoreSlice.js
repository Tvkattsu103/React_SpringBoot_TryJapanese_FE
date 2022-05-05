import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: 'score',
    initialState: {
        count: 0
    },
    reducers: {
        correctAnswer:(state, action) => {
            state.count = state.count + action.payload
        },
        resetScore:(state, action) => {
            state.count = 0
        }
    }
})