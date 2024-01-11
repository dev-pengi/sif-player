import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isError: false,
    videoSrc: null,
    isPlaying: false,
    mediaData: {},
    currentSpeed: 1,
    isPiP: false

}

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        setError(state) {
            state.isError = true
        },
        removeError(state) {
            state.isError = false
        },
        updateVideoSrc(state, action) {
            state.videoSrc = action.payload
        },
        play(state) {
            state.isPlaying = true
        },
        pause(state) {
            state.isPlaying = false
        },
        togglePlay(state) {
            state.isPlaying = !state.isPlaying
        },
        updateMediaData(state, action) {
            state.mediaData = action.payload
        },
        updateSpeed(state, action) {
            state.currentSpeed = action.payload
        },
        enterPiP(state) {
            state.isPiP = true
        },
        exitPiP(state) {
            state.isPiP = false
        },
        resetPlayer(state) {
            state = initialState
        }
    },
})

export default playerSlice;