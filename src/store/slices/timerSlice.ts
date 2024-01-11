import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    duration: 0,
    currentTime: 0,
    buffered: 0,
    timePercentage: 0,
}

const timerSlice = createSlice({
    name: "timer",
    initialState: initialState,
    reducers: {
        initDuration(state, action) {
            state.duration = action.payload;
        },
        updateTime(state, action) {
            state.currentTime = action.payload;
            if (state.duration > 0) {
                state.timePercentage = (state.currentTime / state.duration);
            } else {
                state.timePercentage = 0;
            }
        },
        updateBuffered(state, action) {
            state.buffered = action.payload
        },
        resetTimer(state) {
            state.duration = initialState.duration;
            state.currentTime = initialState.currentTime;
            state.buffered = initialState.buffered;
            state.timePercentage = initialState.timePercentage;
        }
    },
})

export default timerSlice;