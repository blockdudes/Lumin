import { Marketplace } from "@/types/types";
import { colors } from "@material-tailwind/react/types/generic";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface MarketplaceState {
  marketplace: Marketplace | null;
  primary: colors | "white";
  secondary: colors | "white";
}

const initialState: MarketplaceState = {
  marketplace: null,
  primary: "green" as colors,
  secondary: "white" as colors,
};

const validColors: (colors | "white")[] = [
  "gray",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "teal",
  "cyan",
  "blue",
  "indigo",
  "purple",
  "pink",
  "white",
];

export const marketplaceSlice = createSlice({
  name: "marketplace",
  initialState,
  reducers: {
    setMarketplace: (state, action: PayloadAction<Marketplace>) => {
      state.marketplace = action.payload;
      var theme: (colors | "white")[] = (action.payload.theme ?? "green-white")
        .split("-")
        .map((color) => color as colors | "white");
      if (validColors.includes(theme[0]) && validColors.includes(theme[1])) {
        state.primary = theme[0];
        state.secondary = theme[1];
      }
    },
  },
});

export const { setMarketplace } = marketplaceSlice.actions;

export default marketplaceSlice.reducer;
