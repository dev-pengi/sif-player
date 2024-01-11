import { createSlice } from "@reduxjs/toolkit";

const volumeSlice = createSlice({
    name: "volume",
    initialState: {
        volume: 100, isMuted: false
    },
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
        }
    },
})

export default volumeSlice;