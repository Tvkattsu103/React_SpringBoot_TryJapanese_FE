import { configureStore } from "@reduxjs/toolkit";
import lengthSlice from "./lengthSlice";
import scoreSlice from "./scoreSlice";

const store = configureStore({
  reducer: {
    score: scoreSlice.reducer,
    length: lengthSlice.reducer,
  },
});

export default store;
