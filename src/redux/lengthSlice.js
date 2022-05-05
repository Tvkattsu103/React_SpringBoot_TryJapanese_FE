import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: 'length',
    initialState: {
        count: 0
    },
    reducers: {
        wordLength:(state, action) => {
            state.count = action.payload
        }
    }
})