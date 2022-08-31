export type CartItemType = {
  id: string;
  title: string;
  price: number;
  image: string;
  type: string;
  size: number;
  count: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItemType[];
}
