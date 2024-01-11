import { combineReducers, configureStore } from '@reduxjs/toolkit'
import playerSlice from './slices/playerSlice';
import volumeSlice from './slices/volumeSlice';
import timerSlice from './slices/timerSlice';

const rootReducer = combineReducers({
    player: playerSlice.reducer,
    volume: volumeSlice.reducer,
    timer: timerSlice.reducer,
})
const store = configureStore({
    reducer: rootReducer
})

export { store };
export const volumeActions = volumeSlice.actions;
export const playerActions = playerSlice.actions;
export const timerActions = timerSlice.actions;
export type RootState = ReturnType<typeof rootReducer>;