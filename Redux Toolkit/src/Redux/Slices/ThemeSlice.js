import { createSlice } from "@reduxjs/toolkit";

export const ThemeSlice = createSlice({
  name: "theme",
  initialState: {
    value: "light",
  },
  reducers: {
    ToggleTheme: (state) => {
      state.value = state.value === "light" ? "dark" : "light";
    },
  },
});

export const { ToggleTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;
