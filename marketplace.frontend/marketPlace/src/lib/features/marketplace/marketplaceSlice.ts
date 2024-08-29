import { Marketplace } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface MarketplaceState {
  marketplace: Marketplace | null;
  primary: string | null;
  secondary: string | null;
}

const initialState: MarketplaceState = {
  marketplace: null,
  primary: null,
  secondary: null,
};

export const marketplaceSlice = createSlice({
  name: "marketplace",
  initialState,
  reducers: {
    setMarketplace: (state, action: PayloadAction<Marketplace>) => {
      state.marketplace = action.payload;
      var theme = action.payload.theme.split("-");
      state.primary = theme[0];
      state.secondary = theme[1];
    },
  },
});

export const { setMarketplace } = marketplaceSlice.actions;

export default marketplaceSlice.reducer;
