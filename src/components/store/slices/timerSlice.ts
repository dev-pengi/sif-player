import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
    name: "timer",
    initialState: {
        duration: 0,
        currentTime: 0,
        buffered: 0
    },
    reducers: {
        initDuration(state, action) {
            state.duration = action.payload;
        },
        updateTime(state, action) {
            state.currentTime = action.payload;
        },
        updateBuffered(state, action) {
            state.buffered = action.payload
        },
        resetTimer(state) {
            state.duration = 0;
            state.currentTime = 0;
            state.buffered = 0;
        }
    },
})

export default timerSlice;