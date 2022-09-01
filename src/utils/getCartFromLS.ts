import { CartItemType } from "../redux/cart/types";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLS = () => {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = Math.ceil(calcTotalPrice(items));

  return {
    items: items as CartItemType[],
    totalPrice,
  };
};
