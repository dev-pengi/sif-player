import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isFullscreen: false,
    isPanelHovering: false,
    isLocked: false,
    controllersDeps: []
}

const controlsSlice = createSlice({
    name: "controls",
    initialState: initialState,
    reducers: {
        fullscreen(state) {
            state.isFullscreen = true
        },
        unfullscreen(state) {
            state.isFullscreen = false
        },
        toggleFullscreen(state) {
            state.isFullscreen = !state.isFullscreen
        },
        panelHover(state) {
            state.isPanelHovering = true
        },
        panelUnhover(state) {
            state.isPanelHovering = false
        },
        togglePanelHover(state) {
            state.isPanelHovering = !state.isPanelHovering
        },
        lock(state) {
            state.isLocked = true
        },
        unlock(state) {
            state.isLocked = false
        },
        toggleLock(state) {
            state.isLocked = !state.isLocked
        },
        addControllerDependency(state, action) {
            if (!state.controllersDeps.includes(action.payload)) {
                state.controllersDeps.push(action.payload);
            }
        },
        removeControllerDependency(state, action) {
            if (state.controllersDeps.includes(action.payload)) {
                state.controllersDeps.splice(state.controllersDeps.indexOf(action.payload), 1);
            }
        },
        reset(state) {
            state.isFullscreen = initialState.isFullscreen;
            state.isPanelHovering = initialState.isPanelHovering;
            state.isLocked = initialState.isLocked;
            state.controllersDeps = initialState.controllersDeps;
        }
    },
})

export default controlsSlice;