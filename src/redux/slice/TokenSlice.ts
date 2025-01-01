import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Token, TokenDetail } from "../types";

// Define the initial state with a proper structure
const initialState: Token = {
  token1: null,
  token2: null,
};

export const TokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    addToken1: (state, { payload }: PayloadAction<TokenDetail>) => {
      // Ensure state is not null and update token1
      state.token1 = payload;
    },
    addToken2: (state, { payload }: PayloadAction<TokenDetail>) => {
      // Ensure state is not null and update token2
      state.token2 = payload;
    },
    clearToken: () => {
      // Reset state to the initial structure
      return { ...initialState };
    },
  },
});

export const { clearToken, addToken1, addToken2 } = TokenSlice.actions;

export default TokenSlice.reducer;
