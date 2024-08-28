import { configureStore } from "@reduxjs/toolkit";
import appLoaderSlice from "./features/appLoader/appLoaderSlice";
import ownedResourcesSlice from "./features/ownedResources/ownedResourcesSlice";
import marketplaceSlice from "./features/marketplace/marketplaceSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      appLoader: appLoaderSlice,
      ownedResources: ownedResourcesSlice,
      marketplace: marketplaceSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
