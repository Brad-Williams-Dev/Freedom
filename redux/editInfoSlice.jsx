import { createSlice } from "@reduxjs/toolkit";

const editInfoSlice = createSlice({
  name: "editInfo",
  initialState: {
    date: new Date(),
    show: false,
    smokesDay: "",
    cigsPack: "",
    pricePack: "",
  },
  reducers: {
    updateDate: (state, action) => {
      state.date = action.payload;
    },
    updateShow: (state, action) => {
      state.show = action.payload;
    },
    updateSmokesDay: (state, action) => {
      state.smokesDay = action.payload;
    },
    updateCigsPack: (state, action) => {
      state.cigsPack = action.payload;
    },
    updatePricePack: (state, action) => {
      state.pricePack = action.payload;
    },
  },
});

export const {
  updateDate,
  updateShow,
  updateSmokesDay,
  updateCigsPack,
  updatePricePack,
} = editInfoSlice.actions;

export default editInfoSlice.reducer;
