import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isFullscreen: false,
    isPanelHovering: false,
    isLocked: false,
    lastActivityTime: 0,
    controllersDeps: [
        'active'
    ]
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
        updateLastActivityTime(state) {
            const Time = Date.now()
            state.lastActivityTime = Time
        },
        reset(state) {
            return initialState;
        }
    },
})

export default controlsSlice;