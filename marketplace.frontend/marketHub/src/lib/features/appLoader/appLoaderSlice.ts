import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AppLoaderState {
  isAppLoading: boolean;
}

const initialState: AppLoaderState = {
  isAppLoading: false,
};

export const appLoaderSlice = createSlice({
  name: "appLoader",
  initialState,
  reducers: {
    setIsAppLoading: (state, action: PayloadAction<boolean>) => {
      state.isAppLoading = action.payload;
    },
  },
});

export const { setIsAppLoading } = appLoaderSlice.actions;

export default appLoaderSlice.reducer;
