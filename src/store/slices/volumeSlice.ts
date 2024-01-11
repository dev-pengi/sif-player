import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    volume: 100, isMuted: false
}

const volumeSlice = createSlice({
    name: "volume",
    initialState: initialState,
    reducers: {
        updateVolume(state, action) {
            state.volume = action.payload
        },
        muteVolume(state) {
            state.isMuted = true
        },
        unmuteVolume(state) {
            state.isMuted = false
        },
        toggleMute(state) {
            state.isMuted = !state.isMuted
        },
        resetVolume(state) {
            state = initialState
        }
    },
})

export default volumeSlice;