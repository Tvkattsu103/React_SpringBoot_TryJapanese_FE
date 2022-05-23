import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: 'length',
    initialState: {
        word: 0,
        topic: 0,
        user: 0
    },
    reducers: {
        wordLength:(state, action) => {
            state.word = action.payload
        },
        topicLength:(state, action) => {
            state.topic = action.payload
        },
        userLength:(state, action) => {
            state.user = action.payload
        }
    }
})