import { configureStore } from "@reduxjs/toolkit";
import scoreSlice from "./scoreSlice";

const store = configureStore({
  reducer: {
    score: scoreSlice.reducer,
  },
});

export default store;
