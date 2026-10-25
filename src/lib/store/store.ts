import { configureStore } from "@reduxjs/toolkit";
import tripsReducer from "./tripsSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      trips: tripsReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
