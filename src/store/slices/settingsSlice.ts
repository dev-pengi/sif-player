import { createSlice } from "@reduxjs/toolkit";

type SettingsState = {
    primaryColor: string,
    lockShortcuts: boolean,
    lockGestures: boolean,
    normalSkipStep: number,
    doubleSkipStep: number,
    volumeStep: number,
    doubleVolumeStep: number,
    isLoop: boolean,
    shortcutsEnabled: boolean,
    saveTrack: boolean,
    saveAdjustments: boolean,
    playInBackground: boolean,
    playToggleClick: boolean,
    fullScreenOnDoubleClick: boolean,
}

const initialState:SettingsState = {
    primaryColor: localStorage.getItem("primary-color") || "#ff00fb",
    lockShortcuts: localStorage.getItem("lock-shortcuts") === "true" || false,
    lockGestures: localStorage.getItem("lock-gestures") === "true" || false,
    normalSkipStep: Number(localStorage.getItem("skip-step")) || 10,
    doubleSkipStep: Number(localStorage.getItem("double-skip-step")) || 30,
    volumeStep: Number(localStorage.getItem("volume-step")) || 5,
    doubleVolumeStep: Number(localStorage.getItem("double-volume-step")) || 20,
    isLoop: localStorage.getItem("is-loop") === "true" || false,
    shortcutsEnabled: localStorage.getItem("shortcuts-enabled") === "true" || true,
    saveTrack: localStorage.getItem("save-track") === "true" || true,
    saveAdjustments: localStorage.getItem("save-adjustments") === "true" || true,
    playInBackground: localStorage.getItem("play-in-background") === "true" || true,
    playToggleClick: localStorage.getItem("play-toggle-click") === "true" || false,
    fullScreenOnDoubleClick: localStorage.getItem("full-screen-on-double-click") === "true" || true,
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