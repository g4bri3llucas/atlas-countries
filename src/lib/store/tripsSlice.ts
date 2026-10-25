import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TripStatus = "visited" | "wishlist";

type TripsState = {
  /** Country code (alpha-3) mapped to its status. */
  statuses: Record<string, TripStatus>;
  /** True after the saved data was loaded from the browser. */
  hydrated: boolean;
};

const initialState: TripsState = {
  statuses: {},
  hydrated: false,
};

const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {
    hydrate(state, action: PayloadAction<Record<string, TripStatus>>) {
      state.statuses = action.payload;
      state.hydrated = true;
    },
    toggleStatus(
      state,
      action: PayloadAction<{ code: string; status: TripStatus }>,
    ) {
      const { code, status } = action.payload;

      if (state.statuses[code] === status) {
        delete state.statuses[code];
      } else {
        state.statuses[code] = status;
      }
    },
  },
});

export const { hydrate, toggleStatus } = tripsSlice.actions;
export default tripsSlice.reducer;
