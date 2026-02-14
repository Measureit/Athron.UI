import { configureStore } from '@reduxjs/toolkit';
import athleteReducer from './athleteSlice';
import groupReducer from './groupSlice';

const store = configureStore({
  reducer: {
    athlete: athleteReducer,
    group: groupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;