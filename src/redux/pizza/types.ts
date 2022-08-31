export type Pizza = {
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

export enum Status {
  LOADING = "loading",
  SUCCES = "succes",
  ERROR = "error",
}

export interface PizzaCliceState {
  items: Pizza[];
  isLoading: Status;
}
