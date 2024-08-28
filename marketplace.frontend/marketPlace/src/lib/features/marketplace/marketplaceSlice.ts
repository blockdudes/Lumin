import { Marketplace } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface MarketplaceState {
  marketplace: Marketplace | null;
}

const initialState: MarketplaceState = {
  marketplace: null,
};

export const marketplaceSlice = createSlice({
  name: "marketplace",
  initialState,
  reducers: {
    setMarketplace: (state, action: PayloadAction<Marketplace>) => {
      state.marketplace = action.payload;
    },
  },
});

export const { setMarketplace } = marketplaceSlice.actions;

export default marketplaceSlice.reducer;
