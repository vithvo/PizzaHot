import { createSlice } from "@reduxjs/toolkit";
import { fetchPizzas } from "./asyncActions";
import { PizzaCliceState, Status } from "./types";

const initialState: PizzaCliceState = {
  items: [],
  isLoading: Status.LOADING, // loading | succes | error
};

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.isLoading = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = Status.SUCCES;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      console.log("error");
      state.isLoading = Status.ERROR;
      state.items = [];
    });
  },
  // extraReducers: {
  //   [fetchPizzas.pending]: (state: RootState) => {
  //     state.isLoading = "loading";
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.isLoading = "succes";
  //   },
  //   [fetchPizzas.rejected]: (state) => {
  //     console.log("error");
  //     state.isLoading = "error";
  //     state.items = [];
  //   },
  // },
});

export const {} = pizzasSlice.actions;

export default pizzasSlice.reducer;
