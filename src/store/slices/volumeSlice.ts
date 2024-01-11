import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    volume: 100, isMuted: false
}

const volumeSlice = createSlice({
    name: "volume",
    initialState: initialState,
    reducers: {
        update(state, action) {
            state.volume = action.payload
        },
        mute(state) {
            state.isMuted = true
        },
        unmute(state) {
            state.isMuted = false
        },
        toggle(state) {
            state.isMuted = !state.isMuted
        },
        reset(state) {
            state.volume = initialState.volume;
            state.isMuted = initialState.isMuted;
        }
    },
})

export default volumeSlice;