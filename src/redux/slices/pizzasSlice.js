import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzasStatus",
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get(
      `https://6304caef94b8c58fd72534d6.mockapi.io/items?page=${currentPage}&limit=8${category}&sortBy=${sortBy}&order=${order}${search}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  isLoading: "loading", // loading | succes | error
};

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,

  reducers: {},
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.isLoading = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = "succes";
    },
    [fetchPizzas.rejected]: (state) => {
      console.log("error");
      state.isLoading = "error";
      state.items = [];
    },
  },
});

export const selectPizzaData = (state) => state.pizzas;

export const {} = pizzasSlice.actions;

export default pizzasSlice.reducer;
