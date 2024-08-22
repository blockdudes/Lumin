import { configureStore } from "@reduxjs/toolkit";
import appLoaderSlice from "./features/counter/appLoaderSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      appLoader: appLoaderSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
