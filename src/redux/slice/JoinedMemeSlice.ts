import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserDetails } from "../types";

// Define the initial state using that type
const initialState: UserDetails | null = null;

export const ProfileSlice = createSlice({
  name: "joinedMeme",
  initialState,
  reducers: {
    addMeme: (state, { payload }: PayloadAction<UserDetails>) => {
      console.log(payload);
      if (state === null) {
        return payload;
      }
      state.username = payload.username;
      state.name = payload.name;
      state.id = payload.id;
    },
    clearMeme: () => {
      return initialState;
    },
  },
});

export const { addMeme, clearMeme } = ProfileSlice.actions;

export default ProfileSlice.reducer;
