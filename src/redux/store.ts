import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { projectSlice } from './slice/project.slice';
import { userSlice } from './slice/user.slice'; 



export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    projcts: projectSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
