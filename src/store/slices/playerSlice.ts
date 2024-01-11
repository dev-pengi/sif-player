import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isError: false,
    videoSrc: null,
    isPlaying: false,
    mediaData: {
        name: null,
        type: null,
        resolution: null,
        url: null,
        size: 0,
    },
    currentSpeed: 1,
    isPiP: false

}

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        error(state) {
            state.isError = true
        },
        unerror(state) {
            state.isError = false
        },
        source(state, action) {
            state.videoSrc = action.payload
        },
        play(state) {
            state.isPlaying = true
        },
        pause(state) {
            state.isPlaying = false
        },
        toggle(state) {
            state.isPlaying = !state.isPlaying
        },
        updateData(state, action) {
            state.mediaData = action.payload
        },
        addData(state, action) {
            state.mediaData[action.payload.name] = action.payload.value
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
        reset(state) {
            state.isError = initialState.isError;
            state.videoSrc = initialState.videoSrc;
            state.isPlaying = initialState.isPlaying;
            state.mediaData = initialState.mediaData;
            state.currentSpeed = initialState.currentSpeed;
            state.isPiP = initialState.isPiP;
        }
    },
})

export default playerSlice;