import { configureStore } from "@reduxjs/toolkit";
import profile from "./slice/ProfileSlice";
import token from "./slice/TokenSlice"


export const store = configureStore({
  reducer: {
    profile,
    token
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
