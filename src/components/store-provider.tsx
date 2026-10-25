"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store/store";
import { loadStatuses, saveStatuses } from "@/lib/store/storage";
import { hydrate } from "@/lib/store/tripsSlice";

type StoreProviderProps = {
  children: React.ReactNode;
};

export function StoreProvider({ children }: StoreProviderProps) {
  const [store] = useState(makeStore);

  useEffect(() => {
    store.dispatch(hydrate(loadStatuses()));
    let previous = store.getState().trips.statuses;

    return store.subscribe(() => {
      const current = store.getState().trips.statuses;

      if (current !== previous) {
        previous = current;
        saveStatuses(current);
      }
    });
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}
