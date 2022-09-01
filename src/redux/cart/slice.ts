import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { getCartFromLS } from "../../utils/getCartFromLS";

import { CartItemType } from "./types";

const initialState = getCartFromLS();

export const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    setItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      findItem ? findItem.count++ : state.items.push({ ...action.payload, count: 1 });

      state.totalPrice = calcTotalPrice(state.items);
    },

    unSetItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem && findItem.count !== 1) {
        findItem ? findItem.count-- : state.items.push({ ...action.payload, count: 1 });

        state.totalPrice = calcTotalPrice(state.items);
      }
    },
    removeItem(state, action: PayloadAction<CartItemType>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);

      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = calcTotalPrice(state.items);
    },
  },
});

export const { setItem, removeItem, clearItems, unSetItem } = cartSlice.actions;

export default cartSlice.reducer;
