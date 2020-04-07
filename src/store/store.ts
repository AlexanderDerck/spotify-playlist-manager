import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";
import { initialState } from "./state";

export const store = configureStore({
  preloadedState: initialState,
  reducer: rootReducer,
});
