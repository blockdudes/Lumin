import { Course } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CreatedResourcesState {
  createdResources: Course[];
}

const initialState: CreatedResourcesState = {
  createdResources: [],
};

export const createdResourcesSlice = createSlice({
  name: "createdResources",
  initialState,
  reducers: {
    setCreatedResources: (state, action: PayloadAction<Course[]>) => {
      state.createdResources = action.payload;
    },
  },
});

export const { setCreatedResources } = createdResourcesSlice.actions;

export default createdResourcesSlice.reducer;
