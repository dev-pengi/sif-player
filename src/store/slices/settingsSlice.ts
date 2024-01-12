import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    primaryColor: "#ff00fb",
    lockShortcuts: false,
    lockGestures: false,
    normalSkipStep: 10,
    doubleSkipStep: 30,
    volumeStep: 5,
    doubleVolumeStep: 20,
    isLoop: false,
    shortcutsEnabled: true,
    saveTrack: true,
    saveAdjustments: true,
    playInBackground: true,
    playToggleClick: false,
    fullScreenOnDoubleClick: true,
}

const settingsSlice = createSlice({
    name: "settings",
    initialState: initialState,
    reducers: {
        updateColor(state, action) {
            state.primaryColor = action.payload
        },
        lockShortcuts(state) {
            state.lockShortcuts = true
        },
        unlockShortcuts(state) {
            state.lockShortcuts = false
        },
        toggleLockShortcuts(state) {
            state.lockShortcuts = !state.lockShortcuts
        },
        lockGestures(state) {
            state.lockGestures = true
        },
        unlockGestures(state) {
            state.lockGestures = false
        },
        toggleGestures(state) {
            state.lockGestures = !state.lockGestures
        },
        updateNormalSkipStep(state, action) {
            state.normalSkipStep = action.payload
        },
        updateDoubleSkipStep(state, action) {
            state.doubleSkipStep = action.payload
        },
        updateVolumeStep(state, action) {
            state.volumeStep = action.payload
        },
        updateDoubleVolumeStep(state, action) {
            state.doubleVolumeStep = action.payload
        },
        enableLoop(state) {
            state.isLoop = true
        },
        disableLoop(state) {
            state.isLoop = false
        },
        toggleLoop(state) {
            state.isLoop = !state.isLoop
        },
        enableShortcuts(state) {
            state.shortcutsEnabled = true
        },
        disableShortcuts(state) {
            state.shortcutsEnabled = false
        },
        toggleShortcuts(state) {
            state.shortcutsEnabled = !state.shortcutsEnabled
        },
        enableSaveTrack(state) {
            state.saveTrack = true
        },
        disableSaveTrack(state) {
            state.saveTrack = false
        },
        toggleSaveTrack(state) {
            state.saveTrack = !state.saveTrack
        },
        enableSaveAdjustments(state) {
            state.saveAdjustments = true
        },
        disableSaveAdjustments(state) {
            state.saveAdjustments = false
        },
        toggleSaveAdjustments(state) {
            state.saveAdjustments = !state.saveAdjustments
        },
        enablePlayInBackground(state) {
            state.playInBackground = true
        },
        disablePlayInBackground(state) {
            state.playInBackground = false
        },
        togglePlayInBackground(state) {
            state.playInBackground = !state.playInBackground
        },
        enablePlayToggleClick(state) {
            state.playToggleClick = true
        },
        disablePlayToggleClick(state) {
            state.playToggleClick = false
        },
        togglePlayToggleClick(state) {
            state.playToggleClick = !state.playToggleClick
        },
        enableFullScreenOnDoubleClick(state) {
            state.fullScreenOnDoubleClick = true
        },
        disableFullScreenOnDoubleClick(state) {
            state.fullScreenOnDoubleClick = false
        },
        toggleFullScreenOnDoubleClick(state) {
            state.fullScreenOnDoubleClick = !state.fullScreenOnDoubleClick
        },
        reset(state) {
            return initialState;
        }
    },
})

export default settingsSlice;