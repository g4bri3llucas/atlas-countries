import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store/store";
import { hydrate, type TripStatus } from "@/lib/store/tripsSlice";

type RenderWithStoreOptions = {
  hydrated?: boolean;
  statuses?: Record<string, TripStatus>;
};


export function renderWithStore(
  ui: ReactElement,
  { hydrated = true, statuses = {} }: RenderWithStoreOptions = {},
) {
  const store = makeStore();

  if (hydrated) {
    store.dispatch(hydrate(statuses));
  }

  return { store, ...render(<Provider store={store}>{ui}</Provider>) };
}