import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    setItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      findItem ? findItem.count++ : state.items.push({ ...action.payload, count: 1 });

      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    },

    unSetItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem.count > 0) {
        findItem ? findItem.count-- : state.items.push({ ...action.payload, count: 1 });

        state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);

      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    },
  },
});

export const { setItem, removeItem, clearItems, unSetItem } = cartSlice.actions;

export default cartSlice.reducer;
