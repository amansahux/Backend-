import { createSlice } from "@reduxjs/toolkit";


export const CounterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 10,
  },
  reducers: {
    increament: (state) => {
      state.value += 1;
    },
    decreament: (state) => {
      state.value -= 1;
    },
  },
});

export const { increament, decreament } = CounterSlice.actions;
export default CounterSlice.reducer;
