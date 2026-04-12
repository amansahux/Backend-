import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decreament, increament } from "./Redux/Slices/counterSlice";
import { ToggleTheme } from "./Redux/Slices/ThemeSlice";

const App = () => {
  const num = useSelector((state) => {
    return state.counter.value;
  });
  const theme = useSelector((state) => {
    return state.theme.value;
  });

  const dispatch = useDispatch();
  return (
    <>
      <h1>{num}</h1>;<h1>{theme}</h1>
      <button onClick={() => {
        dispatch(increament())
      }
      }>Increse</button>
      <button onClick={() => {
        dispatch(decreament())
      }
      }>Decrease</button>
      <button onClick={() => {
        dispatch(ToggleTheme())
      }
      }>ToggleTheme</button>
    </>
  );
};

export default App;
