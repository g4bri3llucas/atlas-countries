import type { TripStatus } from "./tripsSlice";

const STORAGE_KEY = "atlas:trips:v1";

/** Reads saved statuses from localStorage, ignoring anything invalid. */
export function loadStatuses(): Record<string, TripStatus> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return {};
    }

    const parsed: unknown = JSON.parse(raw);

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      Array.isArray(parsed)
    ) {
      return {};
    }

    const statuses: Record<string, TripStatus> = {};

    for (const [code, status] of Object.entries(parsed)) {
      if (status === "visited" || status === "wishlist") {
        statuses[code] = status;
      }
    }

    return statuses;
  } catch {
    return {};
  }
}

/** Saves statuses to localStorage. Failures (e.g. private mode) are ignored. */
export function saveStatuses(statuses: Record<string, TripStatus>): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses));
  } catch {
    // Storage can be unavailable or full; the app keeps working without it.
  }
}
