import type { RootState } from "./store";
import type { TripStatus } from "./tripsSlice";

export const selectHydrated = (state: RootState): boolean =>
  state.trips.hydrated;

export const selectStatuses = (state: RootState): Record<string, TripStatus> =>
  state.trips.statuses;

export const selectStatus = (
  state: RootState,
  code: string,
): TripStatus | null => state.trips.statuses[code] ?? null;
