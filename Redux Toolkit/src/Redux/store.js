import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "./Slices/counterSlice.js";
import ThemeReducer from "./Slices/ThemeSlice.js";
export const store = configureStore({
  reducer: {
    counter: CounterReducer,
    theme: ThemeReducer,
  },
});
