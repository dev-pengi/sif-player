import { configureStore } from '@reduxjs/toolkit'
import playerSlice from './slices/playerSlice';
import volumeSlice from './slices/volumeSlice';
import timerSlice from './slices/timerSlice';

const store = configureStore({
    reducer: [
        playerSlice.reducer,
        volumeSlice.reducer,
        timerSlice.reducer,
    ]
})

export { store };
export const volumeActions = volumeSlice.actions;
export const playerActions = playerSlice.actions;
export const timerActions = timerSlice.actions; 