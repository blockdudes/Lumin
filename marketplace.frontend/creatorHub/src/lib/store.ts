import { configureStore } from "@reduxjs/toolkit";
import appLoaderSlice from "./features/appLoader/appLoaderSlice";
import createdResourcesSlice from "./features/createdResources/createdResourcesSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      appLoader: appLoaderSlice,
      createdResources: createdResourcesSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
