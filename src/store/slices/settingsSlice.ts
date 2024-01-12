import { createSlice } from "@reduxjs/toolkit";
import { extractLocalStorage } from "../../utils";

const defaultSettings = {
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

const initialState = {
    primaryColor: extractLocalStorage("primary-color", "#ff00fb", "string"),
    lockShortcuts: extractLocalStorage("lock-shortcuts", false, "boolean"),
    lockGestures: extractLocalStorage("lock-gestures", false, "boolean"),
    normalSkipStep: extractLocalStorage("skip-step", 10, "number"),
    doubleSkipStep: extractLocalStorage("double-skip-step", 30, "number"),
    volumeStep: extractLocalStorage("volume-step", 5, "number"),
    doubleVolumeStep: extractLocalStorage("double-volume-step", 20, "number"),
    isLoop: extractLocalStorage("is-loop", false, "boolean"),
    shortcutsEnabled: extractLocalStorage("shortcuts-enabled", true, "boolean"),
    saveTrack: extractLocalStorage("save-track", true, "boolean"),
    saveAdjustments: extractLocalStorage("save-adjustments", true, "boolean"),
    playInBackground: extractLocalStorage("play-in-background", true, "boolean"),
    playToggleClick: extractLocalStorage("play-toggle-click", false, "boolean"),
    fullScreenOnDoubleClick: extractLocalStorage("full-screen-on-double-click", true, "boolean"),
}

const settingsSlice = createSlice({
    name: "settings",
    initialState: initialState,
    reducers: {
        updateColor(state, action) {
            localStorage.setItem("primary-color", action.payload);
            state.primaryColor = action.payload;
        },
        lockShortcuts(state) {
            localStorage.setItem("lock-shortcuts", "true");
            state.lockShortcuts = true
        },
        unlockShortcuts(state) {
            localStorage.setItem("lock-shortcuts", "false");
            state.lockShortcuts = false
        },
        toggleLockShortcuts(state) {
            localStorage.setItem("lock-shortcuts", String(!state.lockShortcuts));
            state.lockShortcuts = !state.lockShortcuts
        },
        lockGestures(state) {
            localStorage.setItem("lock-gestures", "true");
            state.lockGestures = true
        },
        unlockGestures(state) {
            localStorage.setItem("lock-gestures", "false");
            state.lockGestures = false
        },
        toggleGestures(state) {
            localStorage.setItem("lock-gestures", String(!state.lockGestures));
            state.lockGestures = !state.lockGestures
        },
        updateNormalSkipStep(state, action) {
            localStorage.setItem("skip-step", String(action.payload));
            state.normalSkipStep = action.payload
        },
        updateDoubleSkipStep(state, action) {
            localStorage.setItem("double-skip-step", String(action.payload));
            state.doubleSkipStep = action.payload
        },
        updateVolumeStep(state, action) {
            localStorage.setItem("volume-step", String(action.payload));
            state.volumeStep = action.payload
        },
        updateDoubleVolumeStep(state, action) {
            localStorage.setItem("double-volume-step", String(action.payload));
            state.doubleVolumeStep = action.payload
        },
        enableLoop(state) {
            localStorage.setItem("is-loop", "true");
            state.isLoop = true
        },
        disableLoop(state) {
            localStorage.setItem("is-loop", "false");
            state.isLoop = false
        },
        toggleLoop(state) {
            localStorage.setItem("is-loop", String(!state.isLoop));
            state.isLoop = !state.isLoop
        },
        enableShortcuts(state) {
            localStorage.setItem("shortcuts-enabled", "true");
            state.shortcutsEnabled = true
        },
        disableShortcuts(state) {
            localStorage.setItem("shortcuts-enabled", "false");
            state.shortcutsEnabled = false
        },
        toggleShortcuts(state) {
            localStorage.setItem("shortcuts-enabled", String(!state.shortcutsEnabled));
            state.shortcutsEnabled = !state.shortcutsEnabled
        },
        enableSaveTrack(state) {
            localStorage.setItem("save-track", "true");
            state.saveTrack = true
        },
        disableSaveTrack(state) {
            localStorage.setItem("save-track", "false");
            state.saveTrack = false
        },
        toggleSaveTrack(state) {
            localStorage.setItem("save-track", String(!state.saveTrack));
            state.saveTrack = !state.saveTrack
        },
        enableSaveAdjustments(state) {
            localStorage.setItem("save-adjustments", "true");
            state.saveAdjustments = true
        },
        disableSaveAdjustments(state) {
            localStorage.setItem("save-adjustments", "false");
            state.saveAdjustments = false
        },
        toggleSaveAdjustments(state) {
            localStorage.setItem("save-adjustments", String(!state.saveAdjustments));
            state.saveAdjustments = !state.saveAdjustments
        },
        enablePlayInBackground(state) {
            localStorage.setItem("play-in-background", "true");
            state.playInBackground = true
        },
        disablePlayInBackground(state) {
            localStorage.setItem("play-in-background", "false");
            state.playInBackground = false
        },
        togglePlayInBackground(state) {
            localStorage.setItem("play-in-background", String(!state.playInBackground));
            state.playInBackground = !state.playInBackground
        },
        enablePlayToggleClick(state) {
            localStorage.setItem("play-toggle-click", "true");
            state.playToggleClick = true
        },
        disablePlayToggleClick(state) {
            localStorage.setItem("play-toggle-click", "false");
            state.playToggleClick = false
        },
        togglePlayToggleClick(state) {
            localStorage.setItem("play-toggle-click", String(!state.playToggleClick));
            state.playToggleClick = !state.playToggleClick
        },
        enableFullScreenOnDoubleClick(state) {
            localStorage.setItem("full-screen-on-double-click", "true");
            state.fullScreenOnDoubleClick = true
        },
        disableFullScreenOnDoubleClick(state) {
            localStorage.setItem("full-screen-on-double-click", "false");
            state.fullScreenOnDoubleClick = false
        },
        toggleFullScreenOnDoubleClick(state) {
            localStorage.setItem("full-screen-on-double-click", String(!state.fullScreenOnDoubleClick));
            state.fullScreenOnDoubleClick = !state.fullScreenOnDoubleClick
        },
        reset() {
            return initialState;
        },
        default() {
            localStorage.clear();
            return defaultSettings;
        }
    },
})

export default settingsSlice;