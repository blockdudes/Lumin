import { Course } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface OwnedResourcesState {
  ownedResources: Course[];
}

const initialState: OwnedResourcesState = {
  ownedResources: [],
};

export const ownedResourcesSlice = createSlice({
  name: "ownedResources",
  initialState,
  reducers: {
    setOwnedResources: (state, action: PayloadAction<Course[]>) => {
      state.ownedResources = action.payload;
    },
  },
});

export const { setOwnedResources } = ownedResourcesSlice.actions;

export default ownedResourcesSlice.reducer;
