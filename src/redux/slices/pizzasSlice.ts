import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type Pizza = {
  id: string;
  title: string;
  price: number;
  types: number[];
  image: string;
  sizes: number[];
};

export type SearchPizzaParams = {
  order: string;
  sortBy: string;
  category: string;
  search: string;
  currentPage: string;
};

enum Status {
  LOADING = "loading",
  SUCCES = "succes",
  ERROR = "error",
}

interface PizzaCliceState {
  items: Pizza[];
  isLoading: Status;
}

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizzas/fetchPizzasStatus",
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://6304caef94b8c58fd72534d6.mockapi.io/items?page=${currentPage}&limit=8${category}&sortBy=${sortBy}&order=${order}${search}`
    );

    return data;
  }
);

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

export const selectPizzaData = (state: RootState) => state.pizzas;

export const {} = pizzasSlice.actions;

export default pizzasSlice.reducer;
