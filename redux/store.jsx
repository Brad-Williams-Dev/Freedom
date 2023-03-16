import { configureStore } from "@reduxjs/toolkit";
import editInfoReducer from "./editInfoSlice";

const store = configureStore({
  reducer: {
    editInfo: editInfoReducer,
  },
});

export default store;
