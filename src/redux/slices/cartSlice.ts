import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CartItemType = {
  id: string;
	title: string;
  price: number;
  image: string;
  type: string;
  size: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  items: CartItemType[];
}

const initialState: CartSliceState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    setItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      findItem ? findItem.count++ : state.items.push({ ...action.payload, count: 1 });

      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    },

    unSetItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem && findItem.count !== 1) {
        findItem ? findItem.count-- : state.items.push({ ...action.payload, count: 1 });

        state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
      }
    },
    removeItem(state, action: PayloadAction<CartItemType>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload.id);

      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj: CartItemType) => obj.id === id);

export const { setItem, removeItem, clearItems, unSetItem } = cartSlice.actions;

export default cartSlice.reducer;
