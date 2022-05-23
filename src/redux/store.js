import { configureStore } from "@reduxjs/toolkit";
import lengthSlice from "./lengthSlice";
import scoreSlice from "./scoreSlice";
import authSlice from "./authSlice";

const store = configureStore({
  reducer: {
    score: scoreSlice.reducer,
    length: lengthSlice.reducer,
    auth: authSlice.reducer,
  },
});

export default store;
