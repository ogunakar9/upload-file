import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import uploadReducer from "../features/upload/uploadSlice";

export const store = configureStore({
  reducer: {
    upload: uploadReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
